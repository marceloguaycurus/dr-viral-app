"use client"

import * as React from "react"
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function SidebarLogo() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <>
      <div className={`flex items-center ${isCollapsed ? "pb-4" : "pb-2"}`}>
        <Link href="/" className="flex items-center shrink-0">
          <Image 
            src={isCollapsed ? "/images/logo-curto.png" : "/images/logo.png"} 
            alt="Secretária Dora"
            className={cn(
              "h-8 transition-all duration-300",
              isCollapsed ? "" : "h-10 w-auto "
            )}
            width={isCollapsed ? 32 : 160}
            height={isCollapsed ? 32 : 40}
          />
        </Link>
      </div>
    </>
  )
} 