import {
  Select as ShadSelect,
  SelectContent as ShadSelectContent,
  SelectGroup as ShadSelectGroup,
  SelectItem as ShadSelectItem,
  SelectLabel as ShadSelectLabel,
  SelectScrollDownButton as ShadSelectScrollDownButton,
  SelectScrollUpButton as ShadSelectScrollUpButton,
  SelectSeparator as ShadSelectSeparator,
  SelectTrigger as ShadSelectTrigger,
  SelectValue as ShadSelectValue,
} from "@/components/ui/select";
import { withBaseClasses, composeWithChildren } from "@/lib/utils/wrapper-helpers";

const Select = composeWithChildren(ShadSelect, {
  Trigger: withBaseClasses(ShadSelectTrigger, "shadow-none focus-visible:ring-0  data-[state=open]:border-primary"),
  Content: withBaseClasses(ShadSelectContent),
  Item: withBaseClasses(ShadSelectItem),
  Label: withBaseClasses(ShadSelectLabel),
  Separator: withBaseClasses(ShadSelectSeparator),
  ScrollDownButton: withBaseClasses(ShadSelectScrollDownButton),
  ScrollUpButton: withBaseClasses(ShadSelectScrollUpButton),
  Group: ShadSelectGroup,
  Value: ShadSelectValue,
});

export { Select };
