"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { forgotenSchema } from "@/lib/zod";
import { forgotenAction } from "@/actions/auth-actions";
import { redirect } from "next/navigation";

export const ForgotenForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof forgotenSchema>>({
    resolver: zodResolver(forgotenSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotenSchema>) {
    setError(null);
    setMessage(null);

    startTransition(async () => {
      const data = await forgotenAction(values);

      if (data?.error) {
        setError(data.error || "An unexpected error occurred.");
        form.reset();
      } else {
        setMessage("Se ha enviado un correo para restablecer tu contraseña");
        form.reset();
        setTimeout(() => {
          setMessage(null);
          redirect("/login");
        }, 3000);
      }
    });
  }

  return (
    <div className="w-full border border-slate-700 shadow-lg rounded p-5 sm:max-w-[400px] mx-auto bg-slate-800 text-white">
      <h1 className="text-2xl font-bold text-center mb-5">
        Recuperar Contraseña
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="text"
            placeholder="user@gmail.com"
            {...form.register("email")}
            className="mt-1 text-slate-600 selection:mb-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.email && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {error && (
          <p className="mt-5 text-center p-2 rounded border border-red-600 text-red-600">
            {error}
          </p>
        )}
        {message && (
          <p className=" mt-5 text-left p-2 rounded border border-green-600 text-green-600 font-bold">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full my-5 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isPending}
        >
          {isPending ? "Enviando..." : "Enviar Correo"}
        </button>
      </form>
    </div>
  );
};
