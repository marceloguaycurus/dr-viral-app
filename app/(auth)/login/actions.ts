"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/utils/supabase/server";

export type ActionState = string | null;

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
});

const signupSchema = loginSchema
  .extend({
    fullName: z.string().min(2, "Informe seu nome completo"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return parsed.error.issues[0]?.message ?? null;

  const { email, password } = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return error.message;

  redirect("/");
  return null;
}

export async function signupAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) return parsed.error.issues[0]?.message ?? null;

  const { email, password, fullName } = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${SITE_URL}/confirm`,
    },
  });
  if (error) return error.message;

  redirect("/login?toast=success:check-email");
  return null;
}
