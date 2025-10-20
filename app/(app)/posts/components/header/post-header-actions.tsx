import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Filter } from "lucide-react";
import { PostModal } from "../modal/post-modal";

export function PostHeaderActions() {
  return (
    <div className="ml-auto flex items-center gap-2 justify-between w-full sm:w-auto">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-2">
        <PostModal />
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
  );
}
