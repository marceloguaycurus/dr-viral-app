"use server";

import { revalidatePath } from "next/cache";
import { softDeletePost, getUserData } from "@/lib/utils/dataFunctions/bd-management";

export async function deletePost(postId: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const user = await getUserData();
    if (!user?.userId || !user.activeCompanyId) {
      return { ok: false, error: "Usuário ou empresa ativa não encontrados" };
    }

    await softDeletePost(postId, user.activeCompanyId, user.userId);

    try {
      revalidatePath("/");
    } catch {}

    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, error: (error as Error)?.message ?? "Erro ao excluir" };
  }
}
