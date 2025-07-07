import * as React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { withBaseClasses } from "@/lib/utils/wrapper-helpers";

export const Input = withBaseClasses(
  ShadcnInput,
  "shadow-none focus-visible:ring-0 focus-visible:border-primary"
);
export type InputProps = React.ComponentProps<typeof Input>;
