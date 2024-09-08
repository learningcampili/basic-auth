"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { resetPasswordSchema } from "@/lib/zod";
import { resetPasswordAction } from "@/actions/reset-password-actions";
import { useRouter, useSearchParams } from "next/navigation";

export const ResetPasswordForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setError(null);
    setMessage(null);

    startTransition(async () => {
      
      const data = await resetPasswordAction(values, token);

      if (data?.error) {
        setError(data.error || "An unexpected error occurred.");
        form.reset();
      }

      if (data?.success) {
        setMessage("Se ha restablecido la contraseña");
        form.reset();

        setTimeout(() => {
          router.replace("/login");
        }, 2000);
      }
    });
  }

  return (
    <div className="w-full border border-slate-700 shadow-lg rounded p-5 sm:max-w-[400px] mx-auto bg-slate-800 text-white">
      <h1 className="text-2xl font-bold text-center mb-5">
        Resetea la Contraseña
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            placeholder="********"
            {...form.register("password")}
            className="mt-1 mb-5 text-slate-600 selection:mb-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">Confirmar</label>
          <input
            type="password"
            placeholder="********"
            {...form.register("confirmPassword")}
            className="mt-1 text-slate-600 mb-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.confirmPassword.message}
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
          {isPending ? "Cargando..." : "Restablecer"}
        </button>
      </form>
    </div>
  );
};
