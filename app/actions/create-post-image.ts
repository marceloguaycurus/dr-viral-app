"use server";

import { createInstance } from "polotno-node";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { postObjectSchema } from "@/lib/schemas/globalSchemas";
import type z from "zod";
import { uploadFile } from "@/lib/utils/dataFunctions/bd-management";

type CreatePostParams = {
  object: z.infer<typeof postObjectSchema>;
  dimensions: { width: number; height: number };
  bucket?: string;
  storagePath?: string;
};

export async function createPostImage({ object, dimensions, bucket = "posts", storagePath = "generated/" }: CreatePostParams) {
  const { width, height } = dimensions;
  const { header, subheader } = object;

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

  const editorUrl = pathToFileURL(path.join(process.cwd(), "node_modules", "polotno-node", "dist", "index.html")).toString();

  const instance = await createInstance({ key: process.env.POLOTNO_API_KEY!, url: editorUrl });

  try {
    const imageBase64 = await instance.jsonToImageBase64(json, {
      pixelRatio: 1,
    });

    const bytes = Buffer.from(imageBase64, "base64");

    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.png`;
    const filePath = `${storagePath}${fileName}`;
    const path = await uploadFile(filePath, bytes, bucket);
    return path;
  } catch (err) {
    throw new Error((err as Error).message);
  } finally {
    instance.close();
  }
}
