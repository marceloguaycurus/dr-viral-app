"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { logout } from "@/app/(app)/logout/actions";
import { setClinicClient } from "@/lib/utils/selected-clinic-cookie";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

/**
 * LogoutButton renders a dropdown menu item that signs the user out and
 * redirects them to the /login page. Meant to be used inside a Radix
 * DropdownMenu. (E.g. inside NavUser)
 */
export function LogoutButton() {
  const router = useRouter();

  async function handleClick() {
    // Clear selected clinic cookie on the client
    setClinicClient(null);
    // Call the server action to sign the user out
    await logout();
    // Redirect locally to the login screen
    router.replace("/login");
  }

  return (
    <DropdownMenuItem asChild>
      <button onClick={handleClick} className="flex w-full items-center gap-2">
        <LogOut className="size-4" />
        Sair
      </button>
    </DropdownMenuItem>
  );
}
