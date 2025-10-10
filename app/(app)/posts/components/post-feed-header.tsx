"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter, Plus } from "lucide-react"

type TabOption = "gerados" | "agendados" | "publicados"

interface PostFeedHeaderProps {
  activeTab: TabOption
  onTabChange: (tab: TabOption) => void
  onNewPost?: () => void
}

export function PostFeedHeader({ activeTab, onTabChange, onNewPost }: PostFeedHeaderProps) {
  const tabs: { value: TabOption; label: string }[] = [
    { value: "gerados", label: "Gerados" },
    { value: "agendados", label: "Agendados" },
    { value: "publicados", label: "Publicados" },
  ]

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        {/* Mobile: Buttons first, then tabs */}
        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex items-center justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mais recentes</DropdownMenuItem>
                <DropdownMenuItem>Mais antigos</DropdownMenuItem>
                <DropdownMenuItem>Mais populares</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="sm" onClick={onNewPost}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Post
            </Button>
          </div>

          <nav className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTabChange(tab.value)}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.value
                    ? "border-b-2 border-primary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Desktop: Tabs on left, buttons on right */}
        <div className="hidden md:flex md:items-center md:justify-between">
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTabChange(tab.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.value
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mais recentes</DropdownMenuItem>
                <DropdownMenuItem>Mais antigos</DropdownMenuItem>
                <DropdownMenuItem>Mais populares</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="sm" onClick={onNewPost}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Post
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
