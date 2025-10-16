"use client";

import { create } from "zustand";
import { toast } from "sonner";
import { toastMessages, ToastMessageKey } from "../components/shared/toast/messages";

export type ToastKind = "success" | "error" | "info" | "warning";

export interface ToastPayload {
  kind?: ToastKind;
  code: ToastMessageKey | string; // fallback to string for dynamic messages
  override?: string;
}

interface ToastStore {
  push: (payload: ToastPayload) => void;
}

export const useToastStore = create<ToastStore>(() => ({
  push: (payload: ToastPayload) => {
    const { kind = "info", code, override } = payload;

    const message = override ?? (toastMessages as Record<string, string>)[code] ?? code;

    switch (kind) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      default:
        toast.info(message);
    }
  },
}));

export const useToast = () => useToastStore((state: ToastStore) => state.push);
