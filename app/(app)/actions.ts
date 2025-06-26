"use server"

import { setClinicServer } from "@/utils/selected-clinic-cookie"
import { revalidatePath } from "next/cache"
import type { SelectedClinic } from "@/utils/selected-clinic-cookie"

export async function changeClinic(clinic: SelectedClinic | null) {
  await setClinicServer(clinic)
  revalidatePath("/", "layout") // força layout ler novo cookie
}

// Mantém compatibilidade se ainda estiver sendo usado em algum lugar
export async function changeClinicServerAction(clinic: { id: string; nome_clinica?: string; nome?: string; role?: string } | null) {
  if (!clinic) {
    await setClinicServer(null)
    return
  }
  
  await setClinicServer({
    id: clinic.id,
    nome: clinic.nome_clinica || clinic.nome || '',
    role: clinic.role || 'membro'
  })
  revalidatePath("/", "layout")
} 