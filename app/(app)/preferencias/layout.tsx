"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PREFERENCES_TABS,
  PREFERENCES_TABS_CLASSES,
} from "@/lib/constants/sidebarConstants";

function FullPageSkeleton() {
  return (
    <div className="flex-1 mt-4 md:mt-0">
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        </div>
      </div>
    </div>
  );
}

export default function PreferenciasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const currentTab = segment || "agent";

  return (
    <div className="flex-1 p-10 overflow-y-auto">
      <h2>Dê seu estilo à Dora</h2>
      <p>Personalize a Dora para se adequar ao seu estilo e preferências.</p>
      <Separator className="my-4" />

      <Tabs
        value={currentTab}
        orientation="vertical"
        className="flex flex-col md:flex-row md:space-x-6"
      >
        <TabsList className="flex flex-row overflow-x-auto md:flex-col md:space-y-1 w-full md:w-56 shrink-0 pr-2 md:pr-0 pb-2 md:pb-0 md:self-start">
          {PREFERENCES_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={PREFERENCES_TABS_CLASSES.trigger}
              asChild
            >
              <Link href={tab.href}>
                <tab.Icon className={PREFERENCES_TABS_CLASSES.icon} />
                {tab.label}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>

        <Suspense fallback={<FullPageSkeleton />}>{children}</Suspense>
      </Tabs>
    </div>
  );
}
