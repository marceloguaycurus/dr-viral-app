"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { adminNavigationItems } from '@/lib/constants';



export function NavAdmin() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Visão Administrador</SidebarGroupLabel>
      <SidebarMenu>
        {adminNavigationItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              variant="default"
              tooltip={item.title}
              className="w-full justify-start"
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
