"use client"

import { useEffect, useState } from "react"
import { useClinic } from "@/context/clinic-context"
import { HumanTransfer } from "@/app/(app)/preferencias/components/human-transfer"
import { getHumanTransferConfig } from "@/utils/supabase/server"
import { saveHumanTransfer } from "./actions"

export default function TransferPage() {
  const { current: currentClinic } = useClinic()
  const [humanTransferConfig, setHumanTransferConfig] = useState<any>(null)
  const [humanTransferError, setHumanTransferError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchHumanTransferConfig() {
      if (!currentClinic) return
      
      setLoading(true)
      try {
        const config = await getHumanTransferConfig(currentClinic.id)
        setHumanTransferConfig(config)
        setHumanTransferError(null)
      } catch (error: any) {
        setHumanTransferError(error.message)
        setHumanTransferConfig(null)
      } finally {
        setLoading(false)
      }
    }

    if (currentClinic) {
      fetchHumanTransferConfig()
    }
  }, [currentClinic])

  const handleHumanTransferSave = async (data: any) => {
    if (!currentClinic) return
    await saveHumanTransfer(currentClinic.id, data)
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
        <HumanTransfer
          data={humanTransferConfig || {}}
          error={humanTransferError}
          onSave={handleHumanTransferSave}
        />
      </div>
    </div>
  )
} 