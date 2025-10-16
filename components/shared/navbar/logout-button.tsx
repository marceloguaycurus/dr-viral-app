"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { logout } from "@/app/(app)/logout/actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function LogoutButton() {
  const router = useRouter();

  async function handleClick() {
    await logout();
    router.replace("/login");
  }

  return (
    <DropdownMenuItem asChild variant="destructive">
      <a href="#" onClick={handleClick} className="flex w-full items-center gap-2">
        <LogOut className="size-4" />
        Sair
      </a>
    </DropdownMenuItem>
  );
}
