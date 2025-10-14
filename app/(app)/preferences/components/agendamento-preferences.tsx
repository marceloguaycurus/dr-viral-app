"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

type DaySchedule = {
  day: string;
  times: string[];
};

export function AgendamentoPreferences() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: "Sun", times: [] },
    { day: "Mon", times: ["10:00", "11:00"] },
    { day: "Tue", times: [] },
    { day: "Wed", times: ["10:00", "11:00"] },
    { day: "Thu", times: [] },
    { day: "Fri", times: ["10:00", "11:00"] },
    { day: "Sat", times: ["10:00", "11:00"] },
  ]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [queueCount] = useState(2);
  const [editingTimeSlot, setEditingTimeSlot] = useState<{ dayIndex: number; timeIndex: number } | null>(null);

  const handleEditSchedule = () => {
    setIsEditMode(!isEditMode);
    setEditingTimeSlot(null);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditingTimeSlot(null);
  };

  const addTimeSlot = (dayIndex: number) => {
    const newTime = "10:00";
    setSchedule((prev) =>
      prev.map((daySchedule, index) => (index === dayIndex ? { ...daySchedule, times: [...daySchedule.times, newTime] } : daySchedule))
    );
  };

  const removeTimeSlot = (dayIndex: number, timeIndex: number) => {
    setSchedule((prev) =>
      prev.map((daySchedule, index) =>
        index === dayIndex ? { ...daySchedule, times: daySchedule.times.filter((_, tIndex) => tIndex !== timeIndex) } : daySchedule
      )
    );
  };

  const updateTimeSlot = (dayIndex: number, timeIndex: number, newTime: string) => {
    setSchedule((prev) =>
      prev.map((daySchedule, index) =>
        index === dayIndex
          ? { ...daySchedule, times: daySchedule.times.map((time, tIndex) => (tIndex === timeIndex ? newTime : time)) }
          : daySchedule
      )
    );
  };

  const formatTimeForDisplay = (time: string) => {
    // If time already contains AM/PM, return as is
    if (time.includes("AM") || time.includes("PM")) {
      return time;
    }

    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatTimeForInput = (displayTime: string) => {
    // If it's already in 24-hour format, return as is
    if (!displayTime.includes("AM") && !displayTime.includes("PM")) {
      return displayTime;
    }

    const [time, ampm] = displayTime.split(" ");
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Posting Schedule</CardTitle>
          <p className="text-sm text-muted-foreground">Timezone: GMT-3 (America/Sao_Paulo)</p>
          <CardAction>
            <div className="flex gap-2">
              {isEditMode && (
                <Button variant="ghost" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              )}
              <Button variant="outline" onClick={handleEditSchedule}>
                {isEditMode ? "Save Schedule" : "Edit Schedule"}
              </Button>
            </div>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Weekly Schedule Grid */}
          <div className="grid grid-cols-7 gap-4">
            {schedule.map((daySchedule, dayIndex) => (
              <div key={daySchedule.day} className="space-y-3">
                <h3 className="text-center font-medium text-sm">{daySchedule.day}</h3>
                <div className="space-y-2">
                  <div className="min-h-[120px] space-y-2">
                    {daySchedule.times.length === 0 ? (
                      <div className="text-center text-sm text-muted-foreground py-4">No times set</div>
                    ) : (
                      daySchedule.times.map((time, timeIndex) => (
                        <div key={timeIndex} className="relative">
                          {editingTimeSlot?.dayIndex === dayIndex && editingTimeSlot?.timeIndex === timeIndex ? (
                            <Input
                              type="time"
                              defaultValue={formatTimeForInput(time)}
                              className="w-full text-xs bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                              onBlur={(e) => {
                                // Store in 24-hour format to avoid duplication
                                updateTimeSlot(dayIndex, timeIndex, e.target.value);
                                setEditingTimeSlot(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  // Store in 24-hour format to avoid duplication
                                  updateTimeSlot(dayIndex, timeIndex, e.currentTarget.value);
                                  setEditingTimeSlot(null);
                                }
                              }}
                              autoFocus
                            />
                          ) : (
                            <Badge
                              variant="outline"
                              className="w-full justify-center py-2 px-3 text-xs border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 cursor-pointer"
                              onClick={() => isEditMode && setEditingTimeSlot({ dayIndex, timeIndex })}
                            >
                              {formatTimeForDisplay(time)}
                              {isEditMode && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeTimeSlot(dayIndex, timeIndex);
                                  }}
                                  className="ml-2 text-purple-500 hover:text-purple-700"
                                >
                                  ×
                                </button>
                              )}
                            </Badge>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  {isEditMode && (
                    <div className="pt-2">
                      <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => addTimeSlot(dayIndex)}>
                        + Add Time
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Information Section */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Info className="size-4 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-sm text-blue-800">Your posts will be automatically scheduled based on the times above.</p>
            </div>

            <p className="text-sm text-muted-foreground">
              You have <span className="font-medium">{queueCount} posts</span> in your queue that will be published according to this
              schedule.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
