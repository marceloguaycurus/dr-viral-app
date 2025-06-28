"use server";

import { z } from "zod";
import { createClient } from "@/lib/utils/supabase/server";

export type ActionState = string | null;

const passwordSchema = z
  .object({
    newPassword: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"],
  });

export async function updatePasswordAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = passwordSchema.safeParse({
    newPassword: formData.get("newPassword"),
    confirmNewPassword: formData.get("confirmNewPassword"),
  });

  if (!parsed.success) return parsed.error.issues[0].message;

  const { newPassword } = parsed.data as { newPassword: string };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return error.message;

  return null;
}
