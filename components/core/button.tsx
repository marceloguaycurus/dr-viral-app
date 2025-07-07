import * as React from "react";
import { Button as ShadcnButton, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import { buildExtraClasses } from "@/lib/utils/wrapper-helpers";
import type { VariantProps } from "class-variance-authority";

// 1️⃣ ― reaproveita TODAS as variantes do Shadcn
type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button">, ButtonVariantProps {}

// 2️⃣ ― aplica classes extras só quando precisar

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className, ...props }, ref) => {
    const extra = buildExtraClasses(variant as string, size as string, {
      base: "shadow-none",
      variantMap: {
        destructive: "hover:bg-destructive/70",
      },
      sizeMap: {
        icon: "rounded-full",
      },
    });

    return (
      <ShadcnButton
        ref={ref}
        variant={variant}
        size={size}
        className={cn(buttonVariants({ variant, size }), extra, className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
