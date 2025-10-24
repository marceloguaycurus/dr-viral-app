"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { XCircle } from "lucide-react";

type PostErrorStateProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PostErrorState({ open, onOpenChange }: PostErrorStateProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="flex flex-col items-center gap-2 text-center">
          <XCircle className="h-10 w-10" />
          <p className="text-sm">Algo de errado aconteceu. Tente novamente mais tarde.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
