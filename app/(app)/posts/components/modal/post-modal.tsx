"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createPost } from "@/app/actions/create-post";
import { PostCreationForm } from "./post-create-form";
import { PostEditContent } from "./post-edit-content";
import { PostLoadingState } from "./post-loading-state";
import { PostErrorState } from "./post-error-state";
import { getPostForEdit } from "@/lib/utils/dataFunctions/bd-management";
import { usePostsStore } from "@/stores/posts-store";
import { useRouter } from "next/navigation";

export function PostModal() {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const createModalOpen = usePostsStore((s) => s.createModalOpen);
  const setCreateModalOpen = usePostsStore((s) => s.setCreateModalOpen);
  const isLoading = usePostsStore((s) => s.isLoading);
  const setIsLoading = usePostsStore((s) => s.setIsLoading);
  const editModalOpen = usePostsStore((s) => s.editModalOpen);
  const setEditModalOpen = usePostsStore((s) => s.setEditModalOpen);
  const errorModalOpen = usePostsStore((s) => s.errorModalOpen);
  const setErrorModalOpen = usePostsStore((s) => s.setErrorModalOpen);
  const postData = usePostsStore((s) => s.postData);
  const setPostData = usePostsStore((s) => s.setPostData);

  const handleGenerate = async (formData: FormData) => {
    setCreateModalOpen(false);
    setIsLoading(true);

    try {
      const result = await createPost(formData);
      if (!result) {
        throw new Error("Post não foi criado");
      }
      const data = await getPostForEdit(result);
      setPostData(data);
      setIsLoading(false);
      setEditModalOpen(true);
      // Refresh the route data in background so grid includes the new post
      startTransition(() => router.refresh());
    } catch (error) {
      console.error("Error generating text:", error);
      setErrorModalOpen(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Post
        </Button>
      </div>
      <PostCreationForm open={createModalOpen} onOpenChange={setCreateModalOpen} onGenerate={handleGenerate} />
      <PostLoadingState open={isLoading} />
      <PostEditContent open={editModalOpen} onOpenChange={setEditModalOpen} post={postData} />
      <PostErrorState open={errorModalOpen} onOpenChange={setErrorModalOpen} />
    </>
  );
}
