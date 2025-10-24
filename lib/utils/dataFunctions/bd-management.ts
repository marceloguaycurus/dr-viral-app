"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { Organization, OrganizationMember } from "@prisma/client";
import prisma from "../prisma";
import type { UserData } from "@/lib/types/UserTypes";
import type { CreatePostAndAssetArgs, PostWithAssetDisplay, PostListItem } from "@/lib/types/PostTypes";

// Get User Data
export async function getUserData(): Promise<UserData | null> {
  const supabase = await createClient();

  // First get the user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    userId: user.id,
    fullName: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "User",
    email: user.email ?? "",
    avatar: user.user_metadata?.avatar_url ?? `https://ui-avatars.com/api/?name=${user.email}`,
    activeCompanyId: user.user_metadata?.active_company_id ?? null,
  };
}

export async function setActiveCompanyId(companyId: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const current = user?.user_metadata?.active_company_id ?? null;
  if (current === companyId) return;
  await supabase.auth.updateUser({
    data: { active_company_id: companyId },
  });
}

export async function getCompanies(userId: string): Promise<Organization[]> {
  return prisma.organization.findMany({
    where: {
      members: {
        some: { userId },
      },
    },
  });
}

export async function getSelectedCompanyRole(companyId: string, userId: string): Promise<string | null> {
  if (!companyId || !userId) return null;
  const companyMember = await prisma.organizationMember.findUnique({
    where: {
      orgId_userId: {
        orgId: companyId,
        userId: userId,
      },
    },
    select: { role: true },
  });
  if (!companyMember) return null;

  return companyMember.role;
}

export async function getMembershipsWithOrganizations(userId: string) {
  return prisma.organizationMember.findMany({
    where: { userId },
    select: {
      orgId: true,
      role: true,
      organization: true,
    },
  });
}

export async function getPosts(companyId: string): Promise<PostListItem[]> {
  if (!companyId) return [];

  const posts = await prisma.post.findMany({
    where: {
      orgId: companyId,
      deletedAt: null,
    },
    orderBy: [{ scheduledAt: "desc" }, { createdAt: "desc" }],
    include: {
      category: true,
      assets: {
        orderBy: { pageIndex: "asc" },
        take: 1,
        select: { pageIndex: true, storagePath: true, width: true, height: true },
      },
    },
  });

  // Batch sign first asset URL for each post
  const supabase = await createClient();
  const firstAssetPaths = posts.map((p) => p.assets?.[0]?.storagePath).filter((p): p is string => Boolean(p));

  const uniquePaths = Array.from(new Set(firstAssetPaths));

  let signedMap = new Map<string, string>();
  if (uniquePaths.length > 0) {
    const { data, error } = await supabase.storage.from("posts").createSignedUrls(uniquePaths, 60 * 60);

    if (!error && Array.isArray(data)) {
      // data is parallel to input order
      signedMap = new Map(
        data.map((item, idx) => {
          const path = uniquePaths[idx];
          const url = item?.signedUrl ?? null;
          return [path, url ?? ""];
        })
      );
    }
  }

  const withSigned: PostListItem[] = posts.map((post) => {
    const first = post.assets?.[0];
    const firstUrl = first?.storagePath ? signedMap.get(first.storagePath) : undefined;
    const assets = post.assets.map((asset, idx) => ({
      pageIndex: asset.pageIndex,
      storagePath: asset.storagePath,
      width: asset.width ?? 1080,
      height: asset.height ?? 1080,
      ...(idx === 0 && firstUrl ? { publicUrl: firstUrl } : {}),
    }));
    return { ...(post as PostListItem), assets } as PostListItem;
  });

  return withSigned;
}

export async function getMembers(companyId: string): Promise<OrganizationMember[]> {
  return prisma.organizationMember.findMany({
    where: {
      orgId: companyId,
    },
  });
}

export async function getAccountContext(): Promise<string> {
  const accountContext = `Meu perfil no Instagram é @amandamoreiradeabreu. Sou cirurgiã oncologica e o meu objetivo é divulgar o meu trabalho para captar clientes e aumentar o número de seguidores`;
  return accountContext;
}

export async function createPostAndAssets(args: CreatePostAndAssetArgs): Promise<string> {
  const result = await prisma.$transaction(async (tx) => {
    const post = await tx.post.create({
      data: {
        orgId: args.orgId,
        createdBy: args.createdBy,
        type: args.type,
        pagesCount: args.pagesCount,
        description: args.description ?? null,
        caption: args.caption ?? null,
        captionGenerated: args.captionGenerated,
      },
      select: { id: true },
    });

    await tx.postAsset.create({
      data: {
        postId: post.id,
        pageIndex: 1,
        storagePath: args.storagePath,
        mimeType: args.mimeType ?? "image/png",
        width: args.width,
        height: args.height,
      },
    });

    return post.id;
  });

  return result;
}

export async function getPostWithFirstAsset(postId: string) {
  if (!postId) return null;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      assets: {
        orderBy: { pageIndex: "asc" },
        take: 1,
        select: { pageIndex: true, storagePath: true, mimeType: true, width: true, height: true },
      },
    },
  });
  return post;
}

export async function getPostForEdit(postId: string): Promise<PostWithAssetDisplay> {
  if (!postId) return null;

  const post = await getPostWithFirstAsset(postId);
  if (!post) return null;

  const asset = post.assets[0] ?? null;
  const supabase = await createClient();
  const publicUrl = asset?.storagePath ? await signAssetUrlInternal(supabase, asset.storagePath) : "";

  return {
    id: post.id,
    type: post.type,
    caption: post.caption ?? null,
    asset: asset
      ? {
          storagePath: asset.storagePath,
          publicUrl,
          width: asset.width,
          height: asset.height,
          mimeType: asset.mimeType,
        }
      : null,
  };
}

export async function uploadFile(path: string, file: Buffer, bucket: string): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) {
    throw error;
  }
  return data.path;
}

// Helper to sign a single storage path. Exported for reuse if needed.
export async function signAssetUrl(storagePath: string): Promise<string> {
  const supabase = await createClient();
  return signAssetUrlInternal(supabase, storagePath);
}

async function signAssetUrlInternal(supabase: Awaited<ReturnType<typeof createClient>>, storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage.from("posts").createSignedUrl(storagePath, 60 * 60);
  if (!error && data?.signedUrl) {
    return data.signedUrl;
  }
  const { data: pub } = supabase.storage.from("posts").getPublicUrl(storagePath);
  return pub.publicUrl;
}

// Soft delete a post by setting deletedAt. RLS and queries already respect deletedAt is null.
export async function softDeletePost(postId: string, orgId: string, userId: string): Promise<void> {
  if (!postId || !orgId || !userId) return;

  await prisma.post.updateMany({
    where: {
      id: postId,
      orgId,
      deletedAt: null,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
