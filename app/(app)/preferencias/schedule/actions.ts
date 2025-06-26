"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"

export async function saveScheduleRules(clinicId: string, data: any) {
  const supabase = await createClient();
  // Check if the record exists
  const { error: checkError, count } = await supabase
    .from("config_schedule_rules")
    .select("id", { count: 'exact', head: true })
    .eq("clinic_id", clinicId);
  if (checkError) throw new Error(checkError.message);
  
  const payload = {
    clinic_id: clinicId,
    working_hours: data.workingHours,
    break_times: data.breakTimes,
    advance_booking_limit: data.advanceBookingLimit,
    same_day_booking: data.sameDayBooking,
    weekend_booking: data.weekendBooking
  };
  
  if (count === 0) {
    // Insert
    const { error } = await supabase
      .from("config_schedule_rules")
      .insert(payload);
    if (error) throw new Error(error.message);
  } else {
    // Update
    const { error } = await supabase
      .from("config_schedule_rules")
      .update(payload)
      .eq("clinic_id", clinicId);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/preferencias/schedule");
} 