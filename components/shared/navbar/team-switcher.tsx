"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, Building2, RefreshCw, ShieldCheck } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { useClinic } from "@/context/clinic-context";
import { useUserClinics } from "@/hooks/use-user-clinics";
import { Button } from "@/components/ui/button";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const { clinics, isLoading, error, refresh } = useUserClinics();
  const { current, setCurrent } = useClinic();

  const handleRefresh = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    await refresh();
  };

  const onSelect = (clinic: typeof current) => {
    setCurrent(clinic);
  };

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="cursor-default">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg animate-pulse">
              <Building2 className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Carregando clínicas...</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (error) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" variant="outline" className="cursor-default">
            <div className="bg-destructive text-destructive-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Building2 className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Erro ao carregar</span>
              <span className="truncate text-xs">Tente atualizar</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleRefresh} className="ml-auto p-1 h-auto">
              <RefreshCw className="size-4" />
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!current && clinics.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="cursor-default">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Building2 className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Nenhuma clínica</span>
              <span className="truncate text-xs">Adicione uma clínica</span>
            </div>
            <span
              onClick={() => alert("Funcionalidade 'Nova Clínica' não implementada.")}
              className="ml-auto p-1 rounded-md hover:bg-accent transition-colors"
              role="button"
              tabIndex={0}
            >
              <Plus className="size-4" />
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Building2 className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{current?.nome || "Selecione uma clínica"}</span>
                <span className="truncate text-xs">{current?.role || "Nenhuma clínica selecionada"}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs flex justify-between items-center">
              Suas Clínicas
              <Button variant="ghost" size="sm" onClick={handleRefresh} className="p-1 h-auto">
                <RefreshCw className="size-3" />
              </Button>
            </DropdownMenuLabel>
            {clinics.map((clinic) => (
              <DropdownMenuItem
                key={clinic.id}
                onClick={() => onSelect(clinic)}
                className={`gap-2 p-2 ${current?.id === clinic.id ? "bg-accent" : ""}`}
                disabled={isLoading}
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <Building2 className="size-3.5 shrink-0" />
                </div>
                <span className="flex-1 truncate">{clinic.nome}</span>
                {clinic.role === "owner" && <ShieldCheck className="size-3.5 text-primary shrink-0" />}

                {current?.id !== clinic.id}
              </DropdownMenuItem>
            ))}
            {clinics.length === 0 && !isLoading && (
              <DropdownMenuItem disabled className="p-2 text-muted-foreground text-sm">
                Você não é membro de nenhuma clínica.
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={() => alert("Funcionalidade 'Nova Clínica' não implementada.")}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Nova clínica</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
