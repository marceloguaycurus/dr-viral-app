"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import { setSelectedCompanyId } from "@/lib/utils/company-cookie-actions";

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();
  await setSelectedCompanyId(null);
  redirect("/login");
}
