"use client"

import { ConversationsClient } from "./client"
import { ConversationsLoading } from "./components"
import { useClinic } from "@/context/clinic-context"
import { Suspense } from "react"

export default function ConversasPage() {
  const { current } = useClinic()

  if (!current) {
    return (
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="p-6 text-center text-destructive">
          Nenhuma clínica selecionada.
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<ConversationsLoading />}>
      <ConversationsClient clinicId={current.id} />
    </Suspense>
  )
} 