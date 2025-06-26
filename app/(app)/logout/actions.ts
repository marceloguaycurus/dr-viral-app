'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { setClinicServer } from '@/utils/selected-clinic-cookie'

export async function logout() {
  const supabase = await createClient()

  // encerra a sessão (grava cookies vazios)
  await supabase.auth.signOut()

  // Remove o cookie da clínica
  await setClinicServer(null)

  // força o layout raiz a revalidar; opcional, mas evita UI "fantasma"
  revalidatePath('/', 'layout')

  // vai para /login – a middleware deixará passar porque não há sessão
  redirect('/login')
} 