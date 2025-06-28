// lib/auth/require-role.ts
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import { getClinicServer } from "@/lib/utils/selected-clinic-cookie";

export async function requireRole(allowed: ("owner" | "admin")[]) {
  // 1. clínica atual vinda do cookie
  const cookieStore = await cookies();
  const clinic = await getClinicServer(cookieStore);

  // 2. (Opcional) confirma o papel no banco para evitar cookie forjado
  if (clinic?.id) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("v_user_clinic_roles")
      .select("role")
      .eq("clinic_id", clinic.id)
      .maybeSingle();

    clinic.role = data?.role ?? clinic.role;
  }

  if (!clinic || !allowed.includes(clinic.role as "owner" | "admin")) {
    notFound();
  }
  return clinic;
}
