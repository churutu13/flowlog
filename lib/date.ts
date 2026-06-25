import type { FlowEvent } from "./types";

export function toDateKey(date: Date | string) {
  const value = typeof date === "string" ? new Date(date) : date;
  return value.toLocaleDateString("sv-SE");
}

export function isToday(timestamp: string) {
  return toDateKey(timestamp) === toDateKey(new Date());
}

export function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(timestamp));
}

export function formatLongDate(date = new Date()) {
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(date);
}

export function lastSevenDateKeys() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return toDateKey(date);
  });
}

export function sortEventsDesc(events: FlowEvent[]) {
  return [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
