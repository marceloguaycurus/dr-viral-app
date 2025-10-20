"use client";

import { Zap, Calendar, Send } from "lucide-react";
import { usePostsStore } from "@/stores/posts-store";

type TabOption = "gerados" | "agendados" | "publicados";

export function PostTabsNavigation() {
  const activeTab = usePostsStore((s) => s.activeTab);
  const setActiveTab = usePostsStore((s) => s.setActiveTab);

  const tabs: { value: TabOption; label: string; icon: React.ComponentType<{ className?: string }>; items: number }[] = [
    { value: "gerados", label: "Gerados", icon: Zap, items: 5 },
    { value: "agendados", label: "Agendados", icon: Calendar, items: 2 },
    { value: "publicados", label: "Publicados", icon: Send, items: 0 },
  ];

  return (
    <nav className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 flex gap-1 bg-gray-50 border border-gray-200 rounded-md w-full sm:w-auto">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={`flex flex-col sm:flex-row items-center gap-2 px-4 py-2 w-full sm:w-auto text-sm font-medium rounded-md transition-colors ${
            activeTab === tab.value
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          }`}
        >
          <tab.icon className="h-4 w-4" />
          {tab.label + " (" + tab.items + ")"}
        </button>
      ))}
    </nav>
  );
}
