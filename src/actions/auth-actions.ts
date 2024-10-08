"use server";

import { signIn } from "@/auth";

import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { auth } from "@/auth";
// import { revalidatePath } from "next/cache";
import { forgotenSchema, loginSchema, registerSchema } from "@/lib/zod";
import { getUserByEmail } from "@/lib/user";
import { prisma } from "@/lib/prisma";

import { sendMail } from "@/lib/mail";
import { nanoid } from "nanoid";
import { render } from "@react-email/render";
import ConfirmTemplateMail from "@emails/confirm-mail";
import ResetTemplate from "@emails/reset-template";
//import { nanoid } from "nanoid";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Credenciales invalidas" };
  }

  if (!existingUser.emailVerified) {
    return { error: "Cuenta no verificada revisa tu correo" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/profile",
    });

    // // eliminar el token de reseteo de contraseña
    // await prisma.forgotenToken.deleteMany({
    //   where: { identifier: email },
    // });

    //return { success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        case "AccessDenied":
          return { error: "Acceso denegado  " };
        default:
          return { error: "Credenciales invalidas" };
      }
    }
    throw error;
  }
};

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
    const { data, success } = registerSchema.safeParse(values);
    if (!success) {
      return {
        error: "Invalid data",
      };
    }

    // verificar si el usuario ya existe
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        accounts: true, // Incluir las cuentas asociadas
      },
    });

    if (user) {
      // Verificar si tiene cuentas OAuth vinculadas
      const oauthAccounts = user.accounts.filter(
        (account) => account.type === "oauth"
      );
      if (oauthAccounts.length > 0) {
        return {
          error:
            "To confirm your identity, sign in with the same account you used originally.",
        };
      }
      return {
        error: "Ya existe un usuario con este correo",
      };
    }

    // hash de la contraseña
    const passwordHash = await bcrypt.hash(data.password, 10);

    // crear el usuario
    const userCreated = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: passwordHash,
        phone: data.phone || "",
      },
    });

    // // hace el login automatico
    // await signIn("credentials", {
    //   email: data.email,
    //   password: data.password,
    //   redirect: false,
    // });

    const token = nanoid();

    await prisma.verificationToken.create({
      data: {
        identifier: userCreated.email,
        token,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    // enviar email de verificación
    //await sendEmailVerification(user.email, token);

    const emailHtml = await render(
      ConfirmTemplateMail({
        url: `${BASE_URL}/api/auth/verify-email?token=${token}`,
        name: userCreated.name!,
        company: "SoS Mascotas",
      })
    );

    await sendMail({
      to: userCreated.email,
      name: userCreated.name!,
      subject: "Confirma tu cuenta",
      html: emailHtml,
    });

    return {
      success: true,
      message: "Se ha enviado un mail para verificar cuenta",
    };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "Something went wrong" };
  }
};

export const forgotenAction = async (
  values: z.infer<typeof forgotenSchema>
) => {
  const validatedFields = forgotenSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Cuenta invalida" };
  }

  const token = nanoid();

  await prisma.forgotenToken.create({
    data: {
      identifier: existingUser.email,
      token,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  const emailHtml = await render(
    ResetTemplate({
      url: `${BASE_URL}/reset-password?token=${token}`,
      name: existingUser.name!,
      company: "Sos Mascotas",
    })
  );

  try {
    await sendMail({
      to: existingUser.email,
      name: existingUser.name!,
      subject: "Reset your password",
      html: emailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Invalid credentials!" };
  }
};

export const getUserServer = async () => {
  const session = await auth();
  return session?.user;
};
