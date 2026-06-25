import type { FlowEvent, FlowLogData, Medication } from "./types";

const STORAGE_KEY = "flowlog.v1";

export const emptyData: FlowLogData = {
  events: [],
  medications: []
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeData(value: unknown): FlowLogData {
  if (!isRecord(value)) return emptyData;
  const events = Array.isArray(value.events) ? (value.events as FlowEvent[]) : [];
  const medications = Array.isArray(value.medications) ? (value.medications as Medication[]) : [];
  return { events, medications };
}

export function loadFlowLogData(): FlowLogData {
  if (typeof window === "undefined") return emptyData;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeData(JSON.parse(raw)) : emptyData;
  } catch {
    return emptyData;
  }
}

export function saveFlowLogData(data: FlowLogData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
