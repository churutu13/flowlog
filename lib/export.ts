import { formatTime, toDateKey } from "./date";
import type { FlowEvent } from "./types";

const headers = [
  "data",
  "ora",
  "tipo evento",
  "quantita acqua",
  "urgenza",
  "colore urine",
  "nome farmaco/integratore",
  "dose",
  "note"
];

function csvCell(value: string | number | undefined) {
  const text = value === undefined ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function eventsToCsv(events: FlowEvent[]) {
  const rows = events
    .slice()
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .map((event) => [
      toDateKey(event.timestamp),
      formatTime(event.timestamp),
      event.type,
      event.amountMl,
      event.urgency,
      event.urineColor,
      event.medicationName,
      event.dose,
      event.notes
    ]);

  return [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}

export function downloadCsv(csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `flowlog-export-${toDateKey(new Date())}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}
