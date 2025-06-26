"use client"

import { useEffect, useState } from "react"
import { useClinic } from "@/context/clinic-context"
import { Integration } from "@/app/(app)/preferencias/components/integration"
import { getIntegrationConfig } from "@/utils/supabase/server"
import { saveIntegration } from "./actions"

export default function IntegrationPage() {
  const { current: currentClinic } = useClinic()
  const [integrationConfig, setIntegrationConfig] = useState<any>(null)
  const [integrationError, setIntegrationError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchIntegrationConfig() {
      if (!currentClinic) return
      
      setLoading(true)
      try {
        const config = await getIntegrationConfig(currentClinic.id)
        setIntegrationConfig(config)
        setIntegrationError(null)
      } catch (error: any) {
        setIntegrationError(error.message)
        setIntegrationConfig(null)
      } finally {
        setLoading(false)
      }
    }

    if (currentClinic) {
      fetchIntegrationConfig()
    }
  }, [currentClinic])

  const handleIntegrationSave = async (data: any) => {
    if (!currentClinic) return
    await saveIntegration(currentClinic.id, data)
  }

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
    )
  }

  if (!currentClinic) {
    return (
      <div className="flex-1 mt-4 md:mt-0">
        <div className="p-6 text-center text-destructive">
          Nenhuma clínica selecionada.
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 mt-4 md:mt-0">
      <div className="space-y-6">
        <Integration
          data={integrationConfig || {}}
          error={integrationError}
          onSave={handleIntegrationSave}
        />
      </div>
    </div>
  )
} 