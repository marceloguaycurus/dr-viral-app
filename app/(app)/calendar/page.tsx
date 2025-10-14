"use client";

import type React from "react";
import { useState } from "react";
import { CalendarHeader } from "./components/calendar-header";
import { CalendarGrid } from "./components/calendar-grid";
import type { CalendarEvent } from "./components/calendar-event";

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Quarterly Budget Review",
    startDate: 1,
    endDate: 2,
    color: "orange",
  },
  {
    id: "2",
    title: "Project Deadline",
    startDate: 5,
    color: "yellow",
  },
  {
    id: "3",
    title: "Team Meeting",
    startDate: 14,
    time: "10am",
    color: "blue",
  },
  {
    id: "4",
    title: "Lunch with Client",
    startDate: 15,
    time: "12pm",
    color: "green",
  },
  {
    id: "5",
    title: "Product Launch",
    startDate: 17,
    color: "purple",
  },
  {
    id: "6",
    title: "Sales Conference",
    startDate: 18,
    time: "2:30pm",
    color: "pink",
  },
  {
    id: "7",
    title: "Team Meeting",
    startDate: 19,
    time: "9am",
    color: "orange",
  },
  {
    id: "8",
    title: "Design Review",
    startDate: 19,
    color: "blue",
  },
  {
    id: "9",
    title: "Client Call",
    startDate: 19,
    color: "purple",
  },
  {
    id: "10",
    title: "Marketing Strategy Session",
    startDate: 23,
    time: "9am",
    color: "green",
  },
  {
    id: "11",
    title: "Annual Shareholders Meeting",
    startDate: 31,
    color: "blue",
  },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 14)); // October 2025
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(events);
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);

  const goToPreviousMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(2025, 9, 14));
  };

  const handleDragStart = (e: React.DragEvent, event: CalendarEvent) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetDay: number) => {
    e.preventDefault();
    if (!draggedEvent) return;

    const dayDifference = targetDay - draggedEvent.startDate;

    setCalendarEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === draggedEvent.id) {
          return {
            ...event,
            startDate: targetDay,
            endDate: event.endDate ? event.endDate + dayDifference : undefined,
          };
        }
        return event;
      })
    );

    setDraggedEvent(null);
  };

  return (
    <>
      <CalendarHeader currentDate={currentDate} onPreviousMonth={goToPreviousMonth} onNextMonth={goToNextMonth} onToday={goToToday} />
      <div className=" my-4 sm:my-6 max-w-7xl  mx-auto container">
        <CalendarGrid
          currentDate={currentDate}
          events={calendarEvents}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
        />
      </div>
    </>
  );
}
