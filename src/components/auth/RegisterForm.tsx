"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { registerAction } from "@/actions/auth-actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerSchema } from "@/lib/zod";

export const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError(null);
    startTransition(async () => {
      const response = await registerAction(values);
      if (response.error) {
        setError(response.error);
      } else {
        setMessage("Se ha registrado exitosamente \n verifique su email");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    });
  }

  return (
    <div className="w-full border border-slate-700 shadow-lg rounded p-5 sm:max-w-[400px] mx-auto bg-slate-800 text-white">
      <h1 className="text-2xl font-bold text-center mb-5">Registrar</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div>
          <label className="mt-3 block text-sm font-medium">Nombre</label>
          <input
            type="text"
            placeholder="Juan Perez"
            {...form.register("name")}
            className="mt-1 text-slate-600 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.name && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="mt-3 block text-sm font-medium ">Email</label>
          <input
            type="text"
            placeholder="user@gmail.com"
            {...form.register("email")}
            className="mt-1 text-slate-600 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.email && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mt-3 block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            placeholder="********"
            {...form.register("password")}
            className="mt-1 text-slate-600 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="mt-3 block text-sm font-medium">Teléfono</label>
          <input
            type="text"
            placeholder="1163423310"
            {...form.register("phone")}
            className="mt-1 text-slate-600 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.phone && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.phone.message}
            </p>
          )}
        </div>

        {error && (
          <p className="mt-5 text-center p-2 rounded border border-red-600 text-red-600">
            {error}
          </p>
        )}
        {message && (
          <p className="mt-5 text-center p-2 rounded border border-green-600 text-green-600">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full my-5 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isPending}
        >
          {isPending ? "Registrando..." : "Registrar"}
        </button>
      </form>
      <div className="text-center text-sm mt-3 text-slate-500">
        <Link className="hover:text-slate-200" href={"/login"}>
          Ya tienes cuenta?
        </Link>
      </div>
    </div>
  );
};
