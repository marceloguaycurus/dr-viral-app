"use client";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import type { Session } from "@supabase/supabase-js";
import type { UserClinicRole } from "@/lib/types/UserTypes";

// Cliente único no nível do módulo - conforme sugerido
const supabase = createClient();

async function fetchClinics() {
  // Reutilizar o cliente único - conforme sugerido
  const { data, error } = await supabase.from("v_user_clinic_roles").select("clinic_id, clinic_name, role").order("clinic_name");
  if (error) throw error;
  return (data || []).map((c: UserClinicRole) => ({
    id: c.clinic_id,
    nome: c.clinic_name,
    role: c.role,
  }));
}

export function useUserClinics() {
  const [session, setSession] = useState<Session | null>(null);

  // Obter sessão atual
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();

    // Listener para mudanças de auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));

    return () => subscription.unsubscribe();
  }, []); // Dependências vazias conforme sugerido - cliente único

  // Usar chave como array com userId
  const cacheKey = session?.user?.id ? ["user-clinics", session.user.id] : null;

  const { data, error, isLoading, mutate } = useSWR(cacheKey, fetchClinics, {
    revalidateOnMount: true, // impede refetch imediato
    revalidateOnFocus: false, // idem ao voltar ao tab
    revalidateIfStale: true, // mantém comportamento padrão do SWR
  });

  return {
    clinics: data ?? [],
    error,
    isLoading: isLoading || !session?.user?.id,
    refresh: () => mutate(),
  };
}
