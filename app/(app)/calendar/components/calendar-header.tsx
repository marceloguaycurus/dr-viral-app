"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onNewEvent?: () => void;
}

export function CalendarHeader({ currentDate, onPreviousMonth, onNextMonth, onToday, onNewEvent }: CalendarHeaderProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  return (
    <header className="sm:sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="relative flex flex-col-reverse sm:flex-row items-center gap-4">
          {/* Navigation Controls - Centered */}
          <nav className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md p-1">
            <Button variant="outline" size="sm" onClick={onToday} className="bg-transparent text-sm font-medium">
              Today
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={onPreviousMonth} className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onNextMonth} className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h1 className="text-lg font-semibold px-2">
              {monthNames[month]} {year}
            </h1>
          </nav>

          {/* Right Side Controls */}
          <div className="ml-auto flex items-center gap-2 justify-between w-full sm:w-auto">
            <SidebarTrigger className="md:hidden" />
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={onNewEvent}>
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">New event</span>
                <span className="sm:hidden">New</span>
              </Button>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-transparent text-sm">
                    Month
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Day</DropdownMenuItem>
                  <DropdownMenuItem>Week</DropdownMenuItem>
                  <DropdownMenuItem>Month</DropdownMenuItem>
                  <DropdownMenuItem>Year</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
