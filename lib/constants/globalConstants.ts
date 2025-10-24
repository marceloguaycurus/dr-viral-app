import type { PostType } from "@prisma/client";
import type { PostDimensions } from "@/lib/types/PostTypes";

export const DIMENSIONS_BY_TYPE: Record<PostType, PostDimensions> = {
  post: { width: 1080, height: 1080 },
  carousel: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
  reel: { width: 1080, height: 1920 },
};
