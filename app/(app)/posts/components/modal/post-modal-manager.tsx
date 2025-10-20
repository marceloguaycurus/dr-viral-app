"use client";

import { useEffect, useState, useActionState } from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PostCreationForm } from "./post-create-form";
import { PostEditContent } from "./post-edit-content";
import { PostLoadingState } from "./post-loading-state";
import { createPostFromForm, type CreatePostFormState } from "@/lib/utils/dataFunctions/bd-management";

type ModalView = "create" | "edit";

export function PostModalManager() {
  const [currentView, setCurrentView] = useState<ModalView>("create");

  const [state, formAction, isPending] = useActionState(
    async (prevState: CreatePostFormState, formData: FormData) => {
      const result = await createPostFromForm(prevState, formData);
      return result;
    },
    { success: false }
  );

  useEffect(() => {
    if (state?.success) {
      setCurrentView("edit");
    }
  }, [state?.success]);

  return (
    <div className="w-full h-full">
      {isPending ? (
        <PostLoadingState />
      ) : currentView === "create" ? (
        <>
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{currentView === "create" ? "Novo Post" : "Editar Post"}</DialogTitle>
            {currentView === "create" && <DialogDescription>Crie um novo post preenchendo as informações abaixo.</DialogDescription>}
          </DialogHeader>
          <div className="p-6 pt-4">
            <PostCreationForm formAction={formAction} isPending={isPending} error={state?.error} />
          </div>
        </>
      ) : (
        <PostEditContent />
      )}
    </div>
  );
}
