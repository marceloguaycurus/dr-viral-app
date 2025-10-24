import { PostType } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PostDimensions } from "../types/PostTypes";
import { DIMENSIONS_BY_TYPE } from "../constants/globalConstants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDimensionsForType = (type: PostType): PostDimensions => {
  const dimensions = DIMENSIONS_BY_TYPE[type];
  if (!dimensions) {
    throw new Error("Tipo de post inválido");
  }
  return dimensions;
};
