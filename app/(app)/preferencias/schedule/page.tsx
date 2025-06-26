"use client"

import { useEffect, useState } from "react"
import { useClinic } from "@/context/clinic-context"
import { ScheduleRules } from "@/app/(app)/preferencias/components/schedule-rules"
import { getScheduleRules } from "@/utils/supabase/server"
import { saveScheduleRules } from "./actions"

export default function SchedulePage() {
  const { current: currentClinic } = useClinic()
  const [scheduleRules, setScheduleRules] = useState<any>(null)
  const [scheduleError, setScheduleError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchScheduleRules() {
      if (!currentClinic) return
      
      setLoading(true)
      try {
        const rules = await getScheduleRules(currentClinic.id)
        setScheduleRules(rules)
        setScheduleError(null)
      } catch (error: any) {
        setScheduleError(error.message)
        setScheduleRules(null)
      } finally {
        setLoading(false)
      }
    }

    if (currentClinic) {
      fetchScheduleRules()
    }
  }, [currentClinic])

  const handleScheduleRulesSave = async (data: any) => {
    if (!currentClinic) return
    await saveScheduleRules(currentClinic.id, data)
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
        <ScheduleRules
          data={scheduleRules || {}}
          error={scheduleError}
          onSave={handleScheduleRulesSave}
        />
      </div>
    </div>
  )
} 