import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/zod";
import { getUserByEmail, getUserById } from "./lib/user";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { sendMail } from "./lib/mail";
import { render } from "@react-email/render";
import ConfirmTemplateMail from "@emails/confirm-mail";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error("Credenciales inválidas");
        }

        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          throw new Error("Credenciales inválidas - No existe usuario");
        }

        // verificar si la contraseña es correcta
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error("Credenciales inválidas - Incorrect password");
        }

        // verificación de email
        if (!user.emailVerified) {
          const verifyTokenExits = await prisma.verificationToken.findFirst({
            where: {
              identifier: user.email,
            },
          });

          // si existe un token, lo eliminamos
          if (verifyTokenExits?.identifier) {
            await prisma.verificationToken.delete({
              where: {
                identifier: user.email,
              },
            });
          }

          const token = nanoid();

          await prisma.verificationToken.create({
            data: {
              identifier: user.email,
              token,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
          });

          // enviar email de verificación
          //await sendEmailVerification(user.email, token);

          const emailHtml = await render(
            ConfirmTemplateMail({
              url: `http://localhost:3000/api/auth/verify-email?token=${token}`,
              name: user.name!,
              company: "PetFinder",
            })
          );

          await sendMail({
            to: user.email,
            name: "Learning Campili",
            subject: "Confirm your email",
            html: emailHtml,
          });

          throw new Error("Please check Email send verification");
        }
        return { ...user, phone: user.phone || undefined };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      if (!existingUser) {
        return false;
      }
      // if (!existingUser.isActive) {
      //   return false;
      // }

      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      // if (token.roles && session.user) {
      //   session.user.roles = token.roles as string[];
      // }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.role = token.role as string;
        // session.user.phone = token.phone as string;
        //session.user.isActive = token.isActive as boolean;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.id = existingUser.id;
      // token.phone = existingUser.phone;
      //token.isActive = existingUser.isActive;

      // if (token?.isActive === false) {
      //   throw Error("Usuario no esta activo");
      // }
      return token;
    },
    // session() se utiliza para agregar la información del token a la sesión del usuario,
    // lo que hace que esté disponible en el cliente.
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
});
