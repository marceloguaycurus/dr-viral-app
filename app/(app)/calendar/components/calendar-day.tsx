"use client";

import type React from "react";
import { CalendarEventComponent, type CalendarEvent } from "./calendar-event";

interface CalendarDayProps {
  day: number | null;
  index: number;
  isCurrentMonth: boolean;
  isPrevMonth: boolean;
  isNextMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetDay: number) => void;
  onDragStart: (e: React.DragEvent, event: CalendarEvent) => void;
  totalDays: number;
}

export function CalendarDay({
  day,
  index,
  isCurrentMonth,
  isPrevMonth,
  isNextMonth,
  isToday,
  events,
  onDragOver,
  onDrop,
  onDragStart,
  totalDays,
}: CalendarDayProps) {
  const displayDay = isPrevMonth ? Math.abs(day!) : isNextMonth ? Math.abs(day!) - 100 : day;
  const visibleEvents = events.slice(0, 2);
  const hiddenCount = events.length - 2;

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => isCurrentMonth && day && onDrop(e, day)}
      className={`min-h-[80px] border-b border-r border-border p-1.5 last:border-r-0 sm:min-h-[100px] sm:p-2 md:min-h-[120px] ${
        index >= totalDays - 7 ? "border-b-0" : ""
      } ${!isCurrentMonth ? "bg-muted/20" : "bg-card"}`}
    >
      <div className="mb-1 flex justify-start">
        {isToday ? (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background sm:h-7 sm:w-7 sm:text-sm">
            {displayDay}
          </div>
        ) : (
          <div
            className={`flex h-6 w-6 items-center justify-center text-xs sm:h-7 sm:w-7 sm:text-sm ${
              !isCurrentMonth ? "font-normal text-muted-foreground" : "font-medium"
            }`}
          >
            {displayDay}
          </div>
        )}
      </div>

      <div className="space-y-1">
        {visibleEvents.map((event) => (
          <CalendarEventComponent key={event.id} event={event} day={day as number} onDragStart={onDragStart} />
        ))}
        {hiddenCount > 0 && (
          <div className="px-1.5 text-[10px] font-medium text-muted-foreground sm:px-2 sm:text-xs">+ {hiddenCount} more</div>
        )}
      </div>
    </div>
  );
}
