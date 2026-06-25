export type EventType = "water" | "urine" | "medication";
export type UrineColor = "chiaro" | "giallo" | "scuro";
export type MedicationFrequency = "giornaliera" | "al bisogno";

export type FlowEvent = {
  id: string;
  type: EventType;
  timestamp: string;
  amountMl?: number;
  urgency?: number;
  urineColor?: UrineColor;
  medicationId?: string;
  medicationName?: string;
  dose?: string;
  notes?: string;
};

export type Medication = {
  id: string;
  name: string;
  dose: string;
  usualTime: string;
  frequency: MedicationFrequency;
  notes: string;
};

export type FlowLogData = {
  events: FlowEvent[];
  medications: Medication[];
};
