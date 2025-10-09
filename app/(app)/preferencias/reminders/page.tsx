"use client";

import { useEffect, useState } from "react";
import { useClinic } from "@/context/clinic-context";
import { Reminders } from "@/app/(app)/preferencias/components/reminders";
import { getReminders } from "@/lib/utils/dataFunctions/bd-management";
import { saveReminder, deleteReminder } from "./actions";

export default function RemindersPage() {
  const { current: currentClinic } = useClinic();
  const [reminders, setReminders] = useState<any[]>([]);
  const [remindersError, setRemindersError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReminders() {
      if (!currentClinic) return;

      setLoading(true);
      try {
        const remindersList = await getReminders(currentClinic.id);
        setReminders(remindersList);
        setRemindersError(null);
      } catch (error: any) {
        setRemindersError(error.message);
        setReminders([]);
      } finally {
        setLoading(false);
      }
    }

    if (currentClinic) {
      fetchReminders();
    }
  }, [currentClinic]);

  const handleReminderSave = async (data: any) => {
    if (!currentClinic) return;

    try {
      // Converter do formato do component para o formato do banco
      const mappedData = {
        id: data.id,
        triggerName: data.evento,
        triggerType: data.gatilho,
        advanceTime: data.antecedencia,
        channel: data.canal,
        isActive: data.status,
      };

      await saveReminder(currentClinic.id, mappedData);

      // Apenas refetch - mais simples e sem flicker
      const remindersList = await getReminders(currentClinic.id);
      setReminders(remindersList);
    } catch (error) {
      console.error("Erro ao salvar lembrete:", error);
      setRemindersError("Erro ao salvar lembrete");
    }
  };

  const handleReminderDelete = async (reminderId: string) => {
    if (!currentClinic) return;

    try {
      await deleteReminder(reminderId);

      // Atualizar a lista localmente
      setReminders((prev) => prev.filter((reminder) => reminder.id !== reminderId));
    } catch (error) {
      console.error("Erro ao excluir lembrete:", error);
      setRemindersError("Erro ao excluir lembrete");
    }
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
        <Reminders data={reminders || []} error={remindersError} onSave={handleReminderSave} onDelete={handleReminderDelete} />
      </div>
    </div>
  );
}
