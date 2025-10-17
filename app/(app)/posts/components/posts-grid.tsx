"use client";

import type { Post } from "@prisma/client";
import { usePostsStore } from "@/stores/posts-store";
import { PostCard } from "@/app/(app)/posts/components/post-card";
import { PostEmptyState } from "@/app/(app)/posts/components/post-empty-state";

type PostsGridProps = { posts: Post[] };

export function PostsGrid({ posts }: PostsGridProps) {
  const activeTab = usePostsStore((s) => s.activeTab);

  const grouped = posts.reduce(
    (acc, post) => {
      switch (post.status) {
        case "generated":
          acc.gerados.push(post);
          break;
        case "scheduled":
          acc.agendados.push(post);
          break;
        case "published":
          acc.publicados.push(post);
          break;
        default:
          acc.gerados.push(post);
      }
      return acc;
    },
    { gerados: [] as Post[], agendados: [] as Post[], publicados: [] as Post[] }
  );

  const currentPosts = grouped[activeTab];

  if (currentPosts.length === 0) return <PostEmptyState />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {currentPosts.map((post) => (
        <PostCard key={post.id} post={post as Post} />
      ))}
    </div>
  );
}
