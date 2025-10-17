"use client";

import { EmptyState } from "@/app/(app)/posts/components/empty-state";
import { usePostsStore } from "@/stores/posts-store";

export function PostEmptyState() {
  const activeTab = usePostsStore((s) => s.activeTab);
  return <EmptyState tab={activeTab} />;
}
