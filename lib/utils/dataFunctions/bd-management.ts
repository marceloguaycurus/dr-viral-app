"use server";

import type { UserData } from "@/lib/types/UserTypes";
import { getClinicServer } from "@/lib/utils/selected-clinic-cookie";
import type { Member } from "@/app/(app)/(admin)/membros/components/members-table";
import { createClient } from "@/lib/utils/supabase/server";

export async function getAgentConfig(clinicId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("config_agents")
    .select(
      "display_name, avatar_url, tone, scope_scheduling, scope_consultation, scope_reminder, scope_education, scope_prevention, scope_feedback"
    )
    .eq("clinic_id", clinicId)
    .single();
  if (error) throw error;
  if (!data)
    throw new Error(
      "Configuração da agente não encontrada para a clínica informada."
    );
  return {
    displayName: data.display_name,
    avatarPreview: data.avatar_url,
    tone: data.tone,
    activeScopes: {
      scheduling: !!data.scope_scheduling,
      consultation: !!data.scope_consultation,
      reminder: !!data.scope_reminder,
      education: !!data.scope_education,
      prevention: !!data.scope_prevention,
      feedback: !!data.scope_feedback,
    },
  };
}

// Clinic Info
export async function getClinicInfo(clinicId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("config_clinics")
    .select(
      "clinic_name, clinic_address, clinic_landline_phone, clinic_mobile_phone, clinic_email, clinic_website, business_hours"
    )
    .eq("clinic_id", clinicId)
    .single();

  if (error) {
    // Não retornamos valores padrão, lançamos o erro para ser tratado no componente
    throw error;
  }

  if (!data) {
    throw new Error("Informações da clínica não encontradas.");
  }

  return {
    clinicName: data.clinic_name || "",
    address: data.clinic_address || "",
    landlinePhone: data.clinic_landline_phone || "",
    mobilePhone: data.clinic_mobile_phone || "",
    email: data.clinic_email || "",
    website: data.clinic_website || "",
    businessHours: data.business_hours || null,
  };
}

// Human Transfer
export async function getHumanTransferConfig(clinicId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("config_human_transfer")
    .select(
      "trigger_words, escalation_message, notify_by_email, notify_by_whatsapp, business_hours_only"
    )
    .eq("clinic_id", clinicId)
    .single();

  if (error) {
    // Não retornamos valores padrão, lançamos o erro para ser tratado no componente
    throw error;
  }

  if (!data) {
    throw new Error("Configurações de transferência não encontradas.");
  }

  return {
    triggerWords: data.trigger_words,
    escalationMessage: data.escalation_message,
    notifyByEmail: data.notify_by_email,
    notifyByWhatsapp: data.notify_by_whatsapp,
    businessHoursOnly: data.business_hours_only,
  };
}

// Integration
export async function getIntegrationConfig(clinicId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("config_integrations")
    .select("provider, api_key, endpoint_url, connection_status, last_sync")
    .eq("clinic_id", clinicId)
    .single();

  if (error) {
    // Não retornamos valores padrão, lançamos o erro para ser tratado no componente
    throw error;
  }

  if (!data) {
    throw new Error("Configurações de integração não encontradas.");
  }

  return {
    provider: data.provider,
    apiKey: data.api_key || "",
    endpoint: data.endpoint_url || "",
    connectionStatus: data.connection_status,
    lastSync: data.last_sync,
  };
}

// Reminders
export async function getReminders(clinicId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("config_reminders")
    .select("id, trigger_name, trigger_type, advance_time, channel, is_active")
    .eq("clinic_id", clinicId);

  if (error) throw error;

  return (data || []).map((item: any) => ({
    id: item.id,
    evento: item.trigger_name,
    gatilho: item.trigger_type,
    antecedencia: item.advance_time,
    canal: item.channel,
    status: item.is_active,
  }));
}

// Schedule Rules
export async function getScheduleRules(clinicId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("config_schedule_rules")
    .select(
      "min_window_hours, min_window_unit, cancel_deadline_hours, cancel_deadline_unit, max_reschedulings"
    )
    .eq("clinic_id", clinicId)
    .single();

  if (error) {
    // Não retornamos valores padrão, lançamos o erro para ser tratado no componente
    throw error;
  }

  if (!data) {
    throw new Error("Regras de agendamento não encontradas.");
  }

  return {
    minWindowHours: data.min_window_hours.toString(),
    minWindowUnit: data.min_window_unit,
    cancelDeadlineHours: data.cancel_deadline_hours.toString(),
    cancelDeadlineUnit: data.cancel_deadline_unit,
    maxReschedulingsValue: data.max_reschedulings,
    allowOverbooking: false, // Esta coluna não existe na tabela
  };
}

// Get User Data
export async function getUserData(): Promise<UserData | null> {
  const supabase = await createClient();

  // First get the user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    name: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "User",
    email: user.email ?? "",
    avatar:
      user.user_metadata?.avatar_url ??
      `https://ui-avatars.com/api/?name=${user.email}`,
  };
}

export async function getMembers(): Promise<Member[]> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const clinic = await getClinicServer(cookieStore);
  if (!clinic?.id) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("membros_clinica")
    .select("user_id, email, role, created_at")
    .eq("clinic_id", clinic.id);
  if (error) throw error;
  return (data || []).map((item: any) => ({
    id: item.user_id,
    email: item.email,
    role: item.role,
    createdAt: new Date(item.created_at),
  }));
}
