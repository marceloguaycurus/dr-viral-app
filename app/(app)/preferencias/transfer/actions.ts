"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/utils/supabase/server";

export async function saveHumanTransfer(clinicId: string, data: any) {
  const supabase = await createClient();
  // Check if the record exists
  const { error: checkError, count } = await supabase
    .from("config_human_transfer")
    .select("id", { count: "exact", head: true })
    .eq("clinic_id", clinicId);
  if (checkError) throw new Error(checkError.message);

  const payload = {
    clinic_id: clinicId,
    trigger_words: data.triggerWords,
    escalation_message: data.escalationMessage,
    notify_by_email: data.notifyByEmail,
    notify_by_whatsapp: data.notifyByWhatsapp,
    business_hours_only: data.businessHoursOnly,
  };

  if (count === 0) {
    // Insert
    const { error } = await supabase.from("config_human_transfer").insert(payload);
    if (error) throw new Error(error.message);
  } else {
    // Update
    const { error } = await supabase
      .from("config_human_transfer")
      .update(payload)
      .eq("clinic_id", clinicId);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/preferencias/transfer");
}
