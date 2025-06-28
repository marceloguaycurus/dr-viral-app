"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const messages: Record<string, string> = {
  "confirmation-failed":
    "Não foi possível confirmar o e-mail. Tente novamente ou solicite outro link.",
  "token-expired": "O link de confirmação expirou. Peça um novo.",
};

export function ErrorToast({ error }: { error?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (!error) return;

    toast.error(messages[error] ?? "Algo deu errado. Tente novamente.");

    router.replace("/login", { scroll: false });
  }, [error, router]);

  return null;
}
