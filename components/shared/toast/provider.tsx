"use client";

import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && <Toaster richColors position="top-right" />}
      {children}
    </>
  );
}
