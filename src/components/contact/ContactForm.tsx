"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { contactSchema } from "@/lib/zod";
import { contactAction } from "@/actions/contact-actions";

export default function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const response = await contactAction(values);
      if (response?.success) {
        setMessage("Email enviado con exito");
        form.reset();
        // Redirect to a thank you page
      } else {
        setError("No se pudo enviar el email. Intenta mas tarde ");
      }
    });
  }

  return (
    <div className="w-full border border-slate-700 shadow-lg rounded p-5 sm:max-w-[400px] mx-auto bg-slate-800 text-white">
      <h1 className="text-2xl font-bold text-center mb-5">Contactenos</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre y Apellido
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            {...form.register("name")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
          {form.formState.errors.name && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...form.register("email")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
          {form.formState.errors.email && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Mensaje
          </label>
          <textarea
            id="message"
            placeholder="Your message here..."
            {...form.register("message")}
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
          {form.formState.errors.message && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>

        {error && (
          <p className="text-center p-2 rounded border border-red-600 text-red-600">
            {error}
          </p>
        )}

        {message && (
          <p className="text-center p-2 rounded border border-green-600 text-green-600">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
