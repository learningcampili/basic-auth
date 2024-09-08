import { object, string } from "zod";

export const loginSchema = object({
  email: string({ required_error: "El email es requerido" })
    .min(1, "El email es requerido")
    .email("Ingrese un email válido"),
  password: string({ required_error: "La contraseña es requerida" }).min(
    1,
    "La contraseña es requerida"
  ),
});

export const registerSchema = object({
  email: string({ required_error: "El email es requerido" })
    .min(1, "El email es requerido")
    .email("Ingrese un email válido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(6, "La contraseña debe ser de al menos 6 caracteres")
    .max(32, "La contraseña debe ser de menos de 32 caracteres"),
  name: string({ required_error: "El nombre es requerido" })
    .min(1, "El nombre es requerido")
    .max(32, "El nombre debe ser de menos de 32 caracteres"),
  phone: string().optional(),
});

export const contactSchema = object({
  name: string().min(2, { message: "El Nombre es obligatorio" }),
  email: string().email({ message: "Ingresa un email valido" }),
  message: string().min(10, { message: "El mensaje es requerido" }),
});

export const forgotenSchema = object({
  email: string().email({ message: "Ingresa un email valido" }),
});

export const resetPasswordSchema = object({
  password: string({ required_error: "La contraseña es requerida" })
    .min(6, "La contraseña debe ser de al menos 6 caracteres")
    .max(32, "La contraseña debe ser de menos de 32 caracteres"),
  confirmPassword: string({ required_error: "La contraseña es requerida" })
    .min(6, "La contraseña debe ser de al menos 6 caracteres")
    .max(32, "La contraseña debe ser de menos de 32 caracteres"),
});
