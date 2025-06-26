"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"

export async function saveIntegration(clinicId: string, data: any) {
  const supabase = await createClient();
  // Check if the record exists
  const { error: checkError, count } = await supabase
    .from("config_integrations")
    .select("id", { count: 'exact', head: true })
    .eq("clinic_id", clinicId);
  if (checkError) throw new Error(checkError.message);
  
  const payload = {
    clinic_id: clinicId,
    provider: data.provider,
    api_key: data.apiKey,
    endpoint_url: data.endpoint,
    connection_status: data.connectionStatus,
    last_sync: data.lastSync
  };
  
  if (count === 0) {
    // Insert
    const { error } = await supabase
      .from("config_integrations")
      .insert(payload);
    if (error) throw new Error(error.message);
  } else {
    // Update
    const { error } = await supabase
      .from("config_integrations")
      .update(payload)
      .eq("clinic_id", clinicId);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/preferencias/integration");
} 