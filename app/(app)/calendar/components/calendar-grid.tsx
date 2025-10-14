"use client";

import type React from "react";
import { CalendarDay } from "./calendar-day";
import type { CalendarEvent } from "./calendar-event";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetDay: number) => void;
  onDragStart: (e: React.DragEvent, event: CalendarEvent) => void;
}

export function CalendarGrid({ currentDate, events, onDragOver, onDrop, onDragStart }: CalendarGridProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const actualToday = new Date();
  const isViewingCurrentMonth = year === actualToday.getFullYear() && month === actualToday.getMonth();
  const today = actualToday.getDate();

  // Get first day of month and total days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Calculate calendar grid
  const calendarDays: (number | null)[] = [];

  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push(-(daysInPrevMonth - i));
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push(-(100 + i));
  }

  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      if (event.endDate) {
        return day >= event.startDate && day <= event.endDate;
      }
      return event.startDate === day;
    });
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Day headers */}
      <div className="hidden grid-cols-7 border-b border-border bg-muted/30 sm:grid">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="border-r border-border p-2 text-center text-xs font-medium text-muted-foreground last:border-r-0 md:p-3 md:text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          const isCurrentMonth = day !== null && day > 0;
          const isPrevMonth = day !== null && day < 0 && day > -100;
          const isNextMonth = day !== null && day < -100;
          const isToday = isCurrentMonth && isViewingCurrentMonth && day === today;
          const dayEvents = isCurrentMonth ? getEventsForDay(day) : [];

          return (
            <CalendarDay
              key={index}
              day={day}
              index={index}
              isCurrentMonth={isCurrentMonth}
              isPrevMonth={isPrevMonth}
              isNextMonth={isNextMonth}
              isToday={isToday}
              events={dayEvents}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragStart={onDragStart}
              totalDays={calendarDays.length}
            />
          );
        })}
      </div>
    </div>
  );
}
