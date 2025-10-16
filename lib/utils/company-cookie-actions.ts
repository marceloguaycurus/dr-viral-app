"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function setSelectedCompanyId(companyId: string | null) {
  try {
    const cookieStore = await cookies();

    if (companyId) {
      cookieStore.set("selected_company_id", companyId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    } else {
      cookieStore.delete("selected_company_id");
    }

    revalidatePath("/");

    return { success: true, message: "Empresa selecionada com sucesso." };
  } catch {
    return { success: false, message: "Ocorreu um erro ao selecionar a empresa." };
  }
}

export async function getSelectedCompanyId() {
  const cookieStore = await cookies();
  return cookieStore.get("selected_company_id")?.value ?? null;
}
