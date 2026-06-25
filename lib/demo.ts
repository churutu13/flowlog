import { createId } from "./storage";
import type { FlowLogData } from "./types";

export function createDemoData(): FlowLogData {
  const medicationId = createId("med");
  const now = new Date();
  const at = (daysAgo: number, hour: number, minute: number) => {
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    date.setHours(hour, minute, 0, 0);
    return date.toISOString();
  };

  return {
    medications: [
      {
        id: medicationId,
        name: "Magnesio",
        dose: "1 compressa",
        usualTime: "08:30",
        frequency: "giornaliera",
        notes: "Dopo colazione"
      }
    ],
    events: [
      { id: createId("evt"), type: "water", timestamp: at(0, 8, 15), amountMl: 250, notes: "Colazione" },
      { id: createId("evt"), type: "medication", timestamp: at(0, 8, 35), medicationId, medicationName: "Magnesio", dose: "1 compressa", notes: "Dopo colazione" },
      { id: createId("evt"), type: "urine", timestamp: at(0, 9, 10), urgency: 2, urineColor: "chiaro" },
      { id: createId("evt"), type: "water", timestamp: at(0, 11, 40), amountMl: 330 },
      { id: createId("evt"), type: "water", timestamp: at(1, 10, 0), amountMl: 500 },
      { id: createId("evt"), type: "urine", timestamp: at(1, 12, 20), urgency: 3, urineColor: "giallo" },
      { id: createId("evt"), type: "water", timestamp: at(2, 15, 30), amountMl: 750 }
    ]
  };
}
