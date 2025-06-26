"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getClinicClient, setClinicClient, SelectedClinic } from "@/utils/selected-clinic-cookie";
import { useUserClinics } from "@/hooks/use-user-clinics";

type Clinic = SelectedClinic;   // mesmo shape

interface ContextType {
  current: Clinic | null;
  currentClinic: Clinic | null; // alias for convenience
  setCurrent: (c: Clinic | null) => void;
  isLoading: boolean;
  error: Error | undefined;
}

const Ctx = createContext<ContextType | undefined>(undefined);

export function ClinicProvider({ children, initialClinic }: { children: ReactNode; initialClinic: Clinic | null }) {
  // ✅ lazy initializer: só chama getClinicClient() depois que estiver no browser
  const [current, setCurrentState] = useState<Clinic | null>(() => {
    if (initialClinic) return initialClinic;
    if (typeof window !== "undefined") return getClinicClient();
    return null;
  });
  const router = useRouter();
  const { clinics, isLoading, error } = useUserClinics();

  const setCurrent = useCallback((c: Clinic | null) => {
    setCurrentState(c);
    setClinicClient(c);
    // dispara revalidação RSCs que leem cookie
    router.refresh();
  }, [router]);

  // Auto-seleção da primeira clínica conforme análise sugerida
  useEffect(() => {
    if (!current && clinics.length > 0) {
      setCurrent(clinics[0]);
    }
  }, [current, clinics]);

  // Encapsular value em useMemo para evitar rerenders desnecessários
  const value = useMemo(() => ({ current, currentClinic: current, setCurrent, isLoading, error }), [current, setCurrent, isLoading, error]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useClinic() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useClinic outside provider");
  return ctx;
}
