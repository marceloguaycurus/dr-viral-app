import * as React from "react";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import { withBaseClasses } from "@/lib/utils/wrapper-helpers";

export const Textarea = withBaseClasses(
  ShadcnTextarea,
  "shadow-none resize-none focus-visible:ring-0 focus-visible:border-primary"
);
export type TextareaProps = React.ComponentProps<typeof Textarea>;
