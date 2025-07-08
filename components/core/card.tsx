import {
  Card as ShadCard,
  CardHeader as ShadCardHeader,
  CardTitle as ShadCardTitle,
  CardContent as ShadCardContent,
  CardFooter as ShadCardFooter,
  CardDescription as ShadCardDescription,
  CardAction as ShadCardAction,
} from "@/components/ui/card";
import { withBaseClasses, composeWithChildren } from "@/lib/utils/wrapper-helpers";

const CardBase = withBaseClasses(ShadCard, "rounded-md shadow-none");

const Card = composeWithChildren(CardBase, {
  Header: withBaseClasses(ShadCardHeader),
  Title: withBaseClasses(ShadCardTitle),
  Description: withBaseClasses(ShadCardDescription),
  Action: withBaseClasses(ShadCardAction),
  Content: withBaseClasses(ShadCardContent, "flex-1"),
  Footer: withBaseClasses(ShadCardFooter),
});

export { Card };
