"use server";

import { createInstance } from "polotno-node";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createClient } from "@/lib/utils/supabase/server";

type Elements = {
  header?: string;
  subheader?: string;
};

type CreatePostParams = {
  elements: Elements;
  bucket?: string;
  storagePath?: string;
};

export async function createPostImage({ elements, bucket = "posts", storagePath }: CreatePostParams) {
  const supabase = await createClient();
  const header = (elements.header ?? "").toString();
  const subheader = (elements.subheader ?? "").toString();

  const width = 1080;
  const height = 1080;

  const json = {
    width,
    height,
    pages: [
      {
        id: "page-1",
        children: [
          {
            id: "bg",
            type: "figure",
            subType: "rect",
            x: 0,
            y: 0,
            width,
            height,
            fill: "#dbd5d5",
            strokeEnabled: false,
            draggable: false,
            name: "background",
          },
          {
            id: "hdr",
            type: "text",
            text: header,
            x: 0,
            y: 420,
            width,
            height: 80,
            align: "center",
            fontSize: 72,
            fontFamily: "Inter",
            fontStyle: "bold",
            fill: "#111111",
            listening: false,
          },
          {
            id: "sub",
            type: "text",
            text: subheader,
            x: 100,
            y: 540,
            width: width - 200,
            height: 60,
            align: "center",
            fontSize: 40,
            fontFamily: "Inter",
            fill: "#333333",
            listening: false,
          },
        ],
      },
    ],
  };

  // Build explicit file:// URL to Polotno's bundled editor to avoid incorrect
  // file path resolution on some Windows/Next.js setups (e.g. file:\\ROOT).
  const editorUrl = pathToFileURL(path.join(process.cwd(), "node_modules", "polotno-node", "dist", "index.html")).toString();

  const instance = await createInstance({ key: process.env.POLOTNO_API_KEY!, url: editorUrl });

  try {
    const imageBase64 = await instance.jsonToImageBase64(json, {
      pixelRatio: 1,
    });

    const bytes = Buffer.from(imageBase64, "base64");

    const filePath = storagePath ?? `generated/${Date.now()}-${Math.random().toString(36).slice(2)}.png`;

    const { error } = await supabase.storage.from(bucket).upload(filePath, bytes, {
      contentType: "image/png",
      upsert: true,
    });

    if (error) {
      throw error;
    }

    const { data: pub } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return {
      ok: true as const,
      bucket,
      path: filePath,
      publicUrl: pub.publicUrl,
    };
  } catch (err) {
    console.error("createPostImage error:", err);
    return { ok: false as const, error: (err as Error).message };
  } finally {
    instance.close();
  }
}
