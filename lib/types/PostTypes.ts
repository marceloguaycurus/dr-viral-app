import type { Post, PostType } from "@prisma/client";

export type CreatePostAndAssetArgs = {
  orgId: string;
  createdBy: string;
  type: PostType;
  pagesCount: number;
  description?: string | null;
  caption?: string | null;
  captionGenerated: boolean;
  storagePath: string;
  mimeType?: string | null;
  width: number;
  height: number;
};

// Post data shape for UI consumption (first asset with public URL)
export type PostWithAssetDisplay = {
  id: string;
  caption: string | null;
  type: PostType;
  asset: {
    storagePath: string;
    publicUrl: string;
    width?: number | null;
    height?: number | null;
    mimeType?: string | null;
  } | null;
} | null;

export type PostListItem = Post & {
  assets: { pageIndex: number; storagePath: string; publicUrl?: string; width: number; height: number }[];
};

export type PostDimensions = { width: number; height: number };
