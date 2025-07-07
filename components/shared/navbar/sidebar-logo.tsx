"use client";

import * as React from "react";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import LogoShort from "@/public/images/logo-curto.png";

export function SidebarLogo() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <>
      <div className={`flex items-center ${isCollapsed ? "pb-4" : "pb-2"}`}>
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={isCollapsed ? LogoShort : Logo}
            alt="Logo caption"
            className={cn("h-8 transition-all duration-300 w-auto", isCollapsed ? "" : "h-10 w-auto ")}
          />
        </Link>
      </div>
    </>
  );
}
