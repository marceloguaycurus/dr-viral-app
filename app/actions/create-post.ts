"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { createPostSystemPrompt } from "@/prompts/create-post-prompts";
import { getAccountContext, getUserData, createPostAndAssets } from "@/lib/utils/dataFunctions/bd-management";
import { createPostImage } from "./create-post-image";
import type { PostType } from "@prisma/client";
import { getDimensionsForType } from "@/lib/utils/utils";
import { postObjectSchema } from "@/lib/schemas/globalSchemas";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData): Promise<string | null> {
  try {
    const user = await getUserData();
    if (!user?.userId || !user.activeCompanyId) {
      throw new Error("Usuário ou empresa ativa não encontrados");
    }
    const slides = Number(formData.get("slides"));
    const autoCaption = formData.has("auto-caption");
    const type = String(formData.get("post-type")) as PostType;
    const { width, height } = getDimensionsForType(type);

    const accountContext = await getAccountContext();
    const systemPrompt = createPostSystemPrompt(formData, accountContext);
    const userPrompt = String(formData.get("description"));

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      system: systemPrompt,
      schema: postObjectSchema,
      prompt: userPrompt,
    });

    const image = await createPostImage({
      object: object,
      dimensions: { width, height },
    });

    if (!image) {
      throw new Error("Falha ao gerar imagem");
    }

    const storagePath = image as string;

    const postId = await createPostAndAssets({
      orgId: user.activeCompanyId,
      createdBy: user.userId,
      type,
      pagesCount: Number.isFinite(slides) && slides > 0 ? slides : 1,
      description: String(formData.get("description")),
      caption: autoCaption ? object.caption : "",
      captionGenerated: autoCaption,
      storagePath,
      mimeType: "image/png",
      width,
      height,
    });

    // Ensure the posts route is revalidated so the grid includes the new post
    try {
      revalidatePath("/posts");
    } catch {}

    return postId;
  } catch (error) {
    console.error("Error creating post:", error);
    return error as string | null;
  }
}
