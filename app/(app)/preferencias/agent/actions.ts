"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"

export async function saveAgentConfig(clinicId: string, data: {
  displayName: string;
  avatarPreview: string;
  tone: number;
  activeScopes: Record<string, boolean>;
}) {
  const { displayName, avatarPreview, tone, activeScopes } = data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("config_agents")
    .update({
      display_name: displayName,
      avatar_url: avatarPreview,
      tone,
      scope_scheduling: activeScopes.scheduling,
      scope_consultation: activeScopes.consultation,
      scope_reminder: activeScopes.reminder,
      scope_education: activeScopes.education,
      scope_prevention: activeScopes.prevention,
      scope_feedback: activeScopes.feedback,
    })
    .eq("clinic_id", clinicId);
  if (error) throw new Error(error.message);
  revalidatePath("/preferencias/agent");
} 