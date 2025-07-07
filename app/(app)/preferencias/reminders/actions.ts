"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/utils/supabase/server";

export async function saveReminder(clinicId: string, data: any) {
  const supabase = await createClient();
  const payload = {
    clinic_id: clinicId,
    trigger_name: data.triggerName,
    trigger_type: data.triggerType,
    advance_time: data.advanceTime,
    channel: data.channel,
    is_active: data.isActive,
  };

  if (data.id) {
    // Update
    const { error } = await supabase.from("config_reminders").update(payload).eq("id", data.id);
    if (error) throw new Error(error.message);
  } else {
    // Insert
    const { error } = await supabase.from("config_reminders").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/preferencias/reminders");
}

export async function deleteReminder(reminderId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("config_reminders").delete().eq("id", reminderId);
  if (error) throw new Error(error.message);
  revalidatePath("/preferencias/reminders");
}
