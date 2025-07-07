"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navigationItems } from "@/lib/constants/sidebarConstants";

export function NavAdmin() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Visão Administrador</SidebarGroupLabel>
      <SidebarMenu>
        {navigationItems
          .filter((item) => item.menuSection === "Administrador")
          .map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                variant="default"
                tooltip={item.title}
                className="w-full justify-start hover:bg-[#f5f5f5]"
              >
                <Link href={item.href}>
                  {item.icon && <item.icon className="shrink-0" />}
                  <span className="truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
