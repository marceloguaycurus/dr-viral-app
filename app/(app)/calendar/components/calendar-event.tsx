"use client";

import type React from "react";

export type CalendarEvent = {
  id: string;
  title: string;
  startDate: number;
  endDate?: number;
  time?: string;
  color: "blue" | "green" | "purple" | "pink" | "orange" | "yellow";
};

interface CalendarEventProps {
  event: CalendarEvent;
  day: number;
  onDragStart: (e: React.DragEvent, event: CalendarEvent) => void;
}

export function CalendarEventComponent({ event, day, onDragStart }: CalendarEventProps) {
  const getEventStyle = (event: CalendarEvent, day: number) => {
    const isStart = event.startDate === day;
    const isEnd = event.endDate ? event.endDate === day : true;
    const isMultiDay = event.endDate && event.endDate > event.startDate;

    return {
      isStart,
      isEnd,
      isMultiDay,
    };
  };

  const style = getEventStyle(event, day);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, event)}
      className={`cursor-move rounded px-1.5 py-0.5 text-[10px] font-medium transition-opacity hover:opacity-80 sm:px-2 sm:py-1 sm:text-xs ${
        event.color === "blue"
          ? "bg-blue-400 text-white"
          : event.color === "green"
          ? "bg-green-400 text-white"
          : event.color === "purple"
          ? "bg-purple-400 text-white"
          : event.color === "pink"
          ? "bg-pink-400 text-white"
          : event.color === "orange"
          ? "bg-orange-400 text-white"
          : "bg-yellow-400 text-white"
      } ${style.isStart ? "rounded-l" : "rounded-l-none"} ${style.isEnd ? "rounded-r" : "rounded-r-none"}`}
    >
      {style.isStart && (
        <span className="truncate">
          {event.time && <span className="font-semibold">{event.time} </span>}
          <span className="hidden sm:inline">{event.title}</span>
          <span className="sm:hidden">{event.title.slice(0, 8)}...</span>
        </span>
      )}
    </div>
  );
}
