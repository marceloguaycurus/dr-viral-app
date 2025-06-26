"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"

export async function saveClinicInfo(clinicId: string, data: any) {
  const supabase = await createClient();
  // Check if the record exists
  const { error: checkError, count } = await supabase
    .from("config_clinics")
    .select("id", { count: 'exact', head: true })
    .eq("clinic_id", clinicId);
  if (checkError) throw new Error(checkError.message);
  
  const payload = {
    clinic_id: clinicId,
    clinic_name: data.clinicName,
    clinic_address: data.address,
    clinic_landline_phone: data.landlinePhone,
    clinic_mobile_phone: data.mobilePhone,
    clinic_email: data.email,
    clinic_website: data.website,
    business_hours: data.businessHours
  };
  
  if (count === 0) {
    // Insert
    const { error } = await supabase
      .from("config_clinics")
      .insert(payload);
    if (error) throw new Error(error.message);
  } else {
    // Update
    const { error } = await supabase
      .from("config_clinics")
      .update(payload)
      .eq("clinic_id", clinicId);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/preferencias/clinic");
} 