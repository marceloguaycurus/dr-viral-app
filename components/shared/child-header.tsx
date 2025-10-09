"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Fragment } from "react";

type Props = {
  breadcrumb: { label: string; href: string }[];
};

export function ChildHeader({ breadcrumb }: Props) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 gap-2 border-b">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div className="container mx-auto ">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumb.map((item, index) => (
                    <Fragment key={index}>
                      <BreadcrumbItem>
                        {index < breadcrumb.length - 1 ? (
                          <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8 w-64" />
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
