"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { createPostSystemPrompt } from "@/prompts/create-post-prompts";
import { getAccountContext } from "@/lib/utils/dataFunctions/bd-management";
import { createPostImage } from "./create-post-image";
import { z } from "zod";

export async function createPost(_previousState: string | null | undefined, formData: FormData): Promise<string | null> {
  try {
    const accountContext = await getAccountContext();
    const systemPrompt = createPostSystemPrompt(formData, accountContext);
    const userPrompt = String(formData.get("description"));

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      system: systemPrompt,
      schema: z.object({
        title: z.string(),
        caption: z.string(),
        header: z.string(),
        subheader: z.string(),
      }),
      prompt: userPrompt,
    });

    console.log(object);

    const { publicUrl } = await createPostImage({
      elements: {
        header: object.header,
        subheader: object.subheader,
      },
    });

    return publicUrl ?? null;
  } catch (error) {
    console.error("Error creating post:", error);
    return "Erro interno. Tente novamente.";
  }
}
