import {
  Tabs as ShadTabs,
  TabsList as ShadTabsList,
  TabsTrigger as ShadTabsTrigger,
  TabsContent as ShadTabsContent,
} from "@/components/ui/tabs";
import { withBaseClasses, composeWithChildren } from "@/lib/utils/wrapper-helpers";

const TabsBase = withBaseClasses(ShadTabs, "bg-transparent rounded-none");

const Tabs = composeWithChildren(TabsBase, {
  List: withBaseClasses(ShadTabsList, "bg-transparent p-0 rounded-none"),
  Trigger: withBaseClasses(
    ShadTabsTrigger,
    "data-[state=active]:bg-secondary border-b-2 border-transparent text-muted-foreground inline-flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none data-[state=active]:text-primary data-[state=active]:border-b-primary data-[state=inactive]:border-b-border rounded-none data-[state=active]:shadow-none transition-all duration-300"
  ),
  Content: withBaseClasses(ShadTabsContent),
});

export { Tabs };
