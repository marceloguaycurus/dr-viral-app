"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Filter, Plus, Zap, Calendar, Send } from "lucide-react";

type TabOption = "gerados" | "agendados" | "publicados";

interface PostFeedHeaderProps {
  activeTab: TabOption;
  onTabChange: (tab: TabOption) => void;
  onNewPost?: () => void;
}

export function PostFeedHeader({ activeTab, onTabChange, onNewPost }: PostFeedHeaderProps) {
  const tabs: { value: TabOption; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: "gerados", label: "Gerados", icon: Zap },
    { value: "agendados", label: "Agendados", icon: Calendar },
    { value: "publicados", label: "Publicados", icon: Send },
  ];

  return (
    <header className="sm:sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="relative flex flex-col-reverse sm:flex-row items-center gap-4">
          <nav className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 flex gap-1 bg-gray-50 border border-gray-200 rounded-md w-full sm:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTabChange(tab.value)}
                className={`flex flex-col sm:flex-row items-center gap-2 px-4 py-2 w-full sm:w-auto text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.value
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 justify-between w-full sm:w-auto">
            <SidebarTrigger className="md:hidden" />
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={onNewPost}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Post
              </Button>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4 " />
                    <span className="hidden sm:block">Filtrar</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Mais recentes</DropdownMenuItem>
                  <DropdownMenuItem>Mais antigos</DropdownMenuItem>
                  <DropdownMenuItem>Mais populares</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
