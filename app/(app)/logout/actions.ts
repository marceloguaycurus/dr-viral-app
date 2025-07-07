"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import { setClinicServer } from "@/lib/utils/selected-clinic-cookie";

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();
  // Remove o cookie da clínica
  await setClinicServer(null);
  redirect("/login");
}
