"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/shared/toast";
import { ToastKind } from "@/stores/toast-store";

export default function ButtonWithToast({
  kind,
  code,
  override,
  children,
  ...buttonProps
}: {
  kind: ToastKind;
  code: string;
  override?: string;
  children: React.ReactNode;
} & React.ComponentProps<typeof Button>) {
  const pushToast = useToast();

  return (
    <Button
      onClick={() =>
        pushToast({
          kind: kind,
          code,
          override: override ?? "",
        })
      }
      {...buttonProps}
    >
      {children}
    </Button>
  );
}
