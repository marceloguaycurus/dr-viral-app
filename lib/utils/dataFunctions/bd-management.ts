"use server";

import type { UserData } from "@/lib/types/UserTypes";
import { createClient } from "@/lib/utils/supabase/server";
import { Organization, OrganizationMember, Post } from "@prisma/client";
import prisma from "../prisma";

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

// Consolidated membership + organization fetch for sidebar
export async function getMembershipsWithOrganizations(userId: string) {
  return prisma.organizationMember.findMany({
    where: { userId },
    select: {
      orgId: true,
      role: true,
      organization: true, // return full Organization shape for downstream consumers
    },
  });
}

// Posts
export type PostListItem = Post & {
  assets: { pageIndex: number; storagePath: string }[];
};

export async function getPosts(companyId: string): Promise<PostListItem[]> {
  if (!companyId) return [];

  return prisma.post.findMany({
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
        select: { pageIndex: true, storagePath: true },
      },
    },
  });
}

export type CreatePostFormState = { success: boolean; error?: string };

export async function createPostFromForm(_prevState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
  try {
    const postType = String(formData.get("postType") ?? "");
    const category = String(formData.get("category") ?? "");
    const description = String(formData.get("description") ?? "");
    const autoGenerateCaption = String(formData.get("autoGenerateCaption")) === "true";
    const slides = Number(formData.get("slides") ?? 1);

    // Basic validation
    if (!description.trim()) {
      return { success: false, error: "Descrição é obrigatória" };
    }
    if (!category) {
      return { success: false, error: "Categoria é obrigatória" };
    }

    // Simulate AI post generation with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 2000)); // 2-4 seconds

    // TODO: Implement actual AI post generation and DB creation using prisma with the correct schema mapping.
    void postType;
    void category;
    void description;
    void autoGenerateCaption;
    void slides;

    return { success: true };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: "Erro interno. Tente novamente." };
  }
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
