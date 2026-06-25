import { lastSevenDateKeys, toDateKey } from "./date";
import type { FlowEvent } from "./types";

export type DailyStats = {
  dateKey: string;
  waterMl: number;
  urineCount: number;
  urgeCount: number;
};

export function getLastSevenDaysStats(events: FlowEvent[]): DailyStats[] {
  return lastSevenDateKeys().map((dateKey) => {
    const dayEvents = events.filter((event) => toDateKey(event.timestamp) === dateKey);
    return {
      dateKey,
      waterMl: dayEvents.reduce((sum, event) => sum + (event.type === "water" ? event.amountMl ?? 0 : 0), 0),
      urineCount: dayEvents.filter((event) => event.type === "urine").length,
      urgeCount: dayEvents.filter((event) => event.type === "urge").length
    };
  });
}

export function average(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function getTrackedDays(events: FlowEvent[]) {
  return new Set(events.map((event) => toDateKey(event.timestamp))).size;
}
