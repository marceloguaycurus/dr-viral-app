import z from "zod";

export const postObjectSchema = z.object({
  title: z.string(),
  header: z.string(),
  subheader: z.string(),
  caption: z.string(),
});
