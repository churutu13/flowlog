import { lastSevenDateKeys, toDateKey } from "./date";
import type { FlowEvent } from "./types";

export type DailyStats = {
  dateKey: string;
  waterMl: number;
  urineCount: number;
  urgeCount: number;
  mlPerUrine: number | null;
  urgesPerUrine: number | null;
  unmatchedUrges: number;
};

export function getLastSevenDaysStats(events: FlowEvent[]): DailyStats[] {
  return lastSevenDateKeys().map((dateKey) => {
    const dayEvents = events.filter((event) => toDateKey(event.timestamp) === dateKey);
    const waterMl = dayEvents.reduce((sum, event) => sum + (event.type === "water" ? event.amountMl ?? 0 : 0), 0);
    const urineCount = dayEvents.filter((event) => event.type === "urine").length;
    const urgeCount = countEffectiveUrges(dayEvents);

    return {
      dateKey,
      waterMl,
      urineCount,
      urgeCount,
      mlPerUrine: urineCount > 0 ? waterMl / urineCount : null,
      urgesPerUrine: urineCount > 0 ? urgeCount / urineCount : null,
      unmatchedUrges: Math.max(0, urgeCount - urineCount)
    };
  });
}

export function countEffectiveUrges(events: FlowEvent[]) {
  let count = 0;
  let hasOpenUrge = false;

  for (const event of [...events].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())) {
    if (event.type === "urge" && !hasOpenUrge) {
      count += 1;
      hasOpenUrge = true;
    }

    if (event.type === "urine") {
      hasOpenUrge = false;
    }
  }

  return count;
}

export function average(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function getTrackedDays(events: FlowEvent[]) {
  return new Set(events.map((event) => toDateKey(event.timestamp))).size;
}
