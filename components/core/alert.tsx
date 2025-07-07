import {
  Alert as ShadAlert,
  AlertTitle as ShadAlertTitle,
  AlertDescription as ShadAlertDescription,
} from "@/components/ui/alert";
import { withBaseClasses, composeWithChildren } from "@/lib/utils/wrapper-helpers";
import * as React from "react";
import { cn } from "@/lib/utils/utils";
import { buildExtraClasses } from "@/lib/utils/wrapper-helpers";

export type AlertVariant = "default" | "destructive";

export interface AlertProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: AlertVariant;
}

const AlertBase = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "default", className, ...props }, ref) => {
    const extra = buildExtraClasses(variant, "_", {
      base: "rounded-sm shadow-none text-md",
      variantMap: {
        destructive: "bg-destructive/10 text-destructive",
      },
    });

    return <ShadAlert ref={ref} variant={variant} className={cn(extra, className)} {...props} />;
  }
);
AlertBase.displayName = "Alert";

const Alert = composeWithChildren(AlertBase, {
  Title: withBaseClasses(ShadAlertTitle),
  Description: withBaseClasses(ShadAlertDescription),
});

export { Alert };
