"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast, ToastKind } from "./store";

export function RouterToastListener() {
  const router = useRouter();
  const pushToast = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("toast");
    if (!param) return;

    const [kind = "info", code = ""] = param.split(":");
    setTimeout(() => pushToast({ kind: kind as ToastKind, code }), 0);

    // Remove param without refreshing
    params.delete("toast");
    const path = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
    router.replace(path, { scroll: false });
  }, [router, pushToast]);

  return null;
}
