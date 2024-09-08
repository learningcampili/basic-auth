"use server";
import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/zod";
import { z } from "zod";
import * as bcrypt from "bcryptjs";

export const resetPasswordAction = async (
  values: z.infer<typeof resetPasswordSchema>,
  token: string | null
) => {
  if (!token) return { error: "Invalid token" };

  const validatedFields = resetPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden" };
  }

  const resetToken = await prisma.forgotenToken.findFirst({
    where: { token },
  });

  if (!resetToken || resetToken.expires < new Date()) {
    return { error: "Token invalido o ha expirado" };
  }

  const user = await prisma.user.findUnique({
    where: { email: resetToken.identifier },
  });

  if (!user) {
    return { error: "Cuenta invalida" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the user's password
  await prisma.user.update({
    where: { email: user.email },
    data: { password: hashedPassword },
  });

  // Invalidate the token
  await prisma.forgotenToken.deleteMany({ where: { token } });

  return { success: true, token };
};
