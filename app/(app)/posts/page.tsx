"use client";

import { useState } from "react";
import { PostFeedHeader } from "@/app/(app)/posts/components/post-feed-header";
import { PostCard } from "@/app/(app)/posts/components/post-card";
import { EmptyState } from "@/app/(app)/posts/components/empty-state";
import { NewPostModal } from "@/app/(app)/posts/components/new-post-modal";
import { EditPostModal } from "@/app/(app)/posts/components/edit-post-modal";

type TabOption = "gerados" | "agendados" | "publicados";

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabOption>("gerados");
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const postsByTab = {
    gerados: Array.from({ length: 12 }, (_, i) => ({
      id: `gerados-${i + 1}`,
      status: "gerados" as const,
    })),
    agendados: Array.from({ length: 3 }, (_, i) => ({
      id: `agendados-${i + 1}`,
      status: "agendados" as const,
    })),
    publicados: [], // Empty state example
  };

  const currentPosts = postsByTab[activeTab];

  const handleGenerate = () => {
    // Close new post modal
    setIsNewPostModalOpen(false);
    // Open edit modal with loading state
    setIsEditModalOpen(true);
    setIsGenerating(true);

    // Simulate post generation with 2 second timeout
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setIsGenerating(false);
  };

  return (
    <>
      <PostFeedHeader activeTab={activeTab} onTabChange={setActiveTab} onNewPost={() => setIsNewPostModalOpen(true)} />

      <div className="container mx-auto sm:px-12 px-4 py-6">
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentPosts.map((post) => (
              <PostCard key={post.id} />
            ))}
          </div>
        ) : (
          <EmptyState tab={activeTab} />
        )}
      </div>

      <NewPostModal isOpen={isNewPostModalOpen} onClose={() => setIsNewPostModalOpen(false)} onGenerate={handleGenerate} />

      <EditPostModal isOpen={isEditModalOpen} isLoading={isGenerating} onClose={handleCloseEditModal} />
    </>
  );
}
