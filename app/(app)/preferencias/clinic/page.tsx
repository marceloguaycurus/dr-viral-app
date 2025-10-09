"use client";

import { useEffect, useState } from "react";
import { useClinic } from "@/context/clinic-context";
import { ClinicInfo } from "@/app/(app)/preferencias/components/clinic-info";
import { getClinicInfo } from "@/lib/utils/dataFunctions/bd-management";
import { saveClinicInfo } from "./actions";

export default function ClinicPage() {
  const { current: currentClinic } = useClinic();
  const [clinicInfo, setClinicInfo] = useState<any>(null);
  const [clinicError, setClinicError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClinicInfo() {
      if (!currentClinic) return;

      setLoading(true);
      try {
        const info = await getClinicInfo(currentClinic.id);
        setClinicInfo(info);
        setClinicError(null);
      } catch (error: any) {
        setClinicError(error.message);
        setClinicInfo(null);
      } finally {
        setLoading(false);
      }
    }

    if (currentClinic) {
      fetchClinicInfo();
    }
  }, [currentClinic]);

  const handleClinicInfoSave = async (data: any) => {
    if (!currentClinic) return;
    await saveClinicInfo(currentClinic.id, data);
  };

  if (loading) {
    return (
      <div className="flex-1 mt-4 md:mt-0">
        <div className="space-y-6">
          <div className="h-8 bg-muted rounded animate-pulse" />
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!currentClinic) {
    return (
      <div className="flex-1 mt-4 md:mt-0">
        <div className="p-6 text-center text-destructive">Nenhuma clínica selecionada.</div>
      </div>
    );
  }

  return (
    <div className="flex-1 mt-4 md:mt-0">
      <div className="space-y-6">
        <ClinicInfo data={clinicInfo || {}} error={clinicError} onSave={handleClinicInfoSave} />
      </div>
    </div>
  );
}
