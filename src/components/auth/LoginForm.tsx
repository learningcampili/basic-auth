"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { loginSchema } from "@/lib/zod";
import { loginAction } from "@/actions/auth-actions";
import GoogleSignInButton from "./GoogleSignInButton";
import { redirect } from "next/navigation";

export const FormLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null);

    startTransition(async () => {
      const data = await loginAction(values);

      if (data?.error) {
        setError(data.error || "An unexpected error occurred.");
      }
      if (data?.success) {
        redirect("/profile");
      }
      form.reset();
    });
  }

  return (
    <div className="w-full border border-slate-700 shadow-lg rounded p-5 sm:max-w-[400px] mx-auto bg-slate-800 text-white">
      <h1 className="text-2xl font-bold text-center mb-5">Login</h1>
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

        <div>
          <label className="block text-sm font-medium ">Contarseña</label>
          <input
            type="password"
            placeholder="********"
            {...form.register("password")}
            className="mt-1 text-slate-600 mb-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {error && (
          <p className="text-center p-2 rounded border border-red-600 text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full my-5 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isPending}
        >
          Login
        </button>
      </form>

      <GoogleSignInButton />

      <div className=" w-full flex  flex-col justify-center items-center  gap-5 text-sm mt-3 text-slate-500  sm:flex-row ">
        <Link className="hover:text-slate-200" href={"/register"}>
          No estás registrado?
        </Link>
        <Link className="hover:text-slate-200" href={"/forgoten-password"}>
          Olvidaste la contraseña?
        </Link>
      </div>
    </div>
  );
};
