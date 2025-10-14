"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Settings, User, Mic, Palette, Calendar } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const preferencesTabs = [
  { id: "perfil", label: "Perfil", path: "/preferences/profile", icon: User },
  { id: "voz", label: "Voz", path: "/preferences/voice", icon: Mic },
  { id: "marca", label: "Marca", path: "/preferences/brand", icon: Palette },
  { id: "agenda", label: "Agenda", path: "/preferences/schedule", icon: Calendar },
];

export function PreferencesHeader() {
  const pathname = usePathname();
  const router = useRouter();

  // Get current tab from pathname
  const currentTab = preferencesTabs.find((tab) => pathname.startsWith(tab.path))?.id || "perfil";

  const handleTabChange = (tabId: string) => {
    const tab = preferencesTabs.find((t) => t.id === tabId);
    if (tab) {
      router.push(tab.path);
    }
  };

  return (
    <header className="sm:sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="relative flex flex-col-reverse sm:flex-row items-center gap-4">
          {/* Navigation Tabs - Centered */}
          <nav className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 flex gap-1 bg-gray-50 border border-gray-200 rounded-md w-full sm:w-auto">
            {preferencesTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex flex-col sm:flex-row items-center gap-2 px-4 py-2 w-full sm:w-auto text-sm font-medium rounded-md transition-colors ${
                  currentTab === tab.id
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="ml-auto flex items-center gap-2 justify-between w-full sm:w-auto">
            <SidebarTrigger className="md:hidden" />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:block">Configurações</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
