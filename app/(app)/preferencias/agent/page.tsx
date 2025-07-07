"use client";

import { useEffect, useState } from "react";
import { useClinic } from "@/context/clinic-context";
import { AgentIdForm, AgentConfigData } from "@/app/(app)/preferencias/components/agent-config";
import { getAgentConfig } from "@/lib/utils/dataFunctions/bd-management";
import { saveAgentConfig } from "./actions";

export default function AgentPage() {
  const { current: currentClinic } = useClinic();
  const [agentConfig, setAgentConfig] = useState<AgentConfigData | null>(null);
  const [agentError, setAgentError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgentConfig() {
      if (!currentClinic) return;

      setLoading(true);
      try {
        const config = await getAgentConfig(currentClinic.id);
        setAgentConfig(config);
        setAgentError(null);
      } catch (error: any) {
        setAgentError(error.message);
        setAgentConfig(null);
      } finally {
        setLoading(false);
      }
    }

    if (currentClinic) {
      fetchAgentConfig();
    }
  }, [currentClinic]);

  const handleAgentSave = async (data: AgentConfigData) => {
    if (!currentClinic) return;
    await saveAgentConfig(currentClinic.id, {
      displayName: data.displayName,
      avatarPreview: data.avatarPreview || "",
      tone: data.tone,
      activeScopes: data.activeScopes,
    });
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
        <AgentIdForm
          data={
            agentConfig || {
              displayName: "",
              avatarPreview: "/default-avatar.png",
              tone: 0,
              activeScopes: {
                scheduling: false,
                consultation: false,
                reminder: false,
                education: false,
                prevention: false,
                feedback: false,
              },
            }
          }
          error={agentError}
          onSave={handleAgentSave}
        />
      </div>
    </div>
  );
}
