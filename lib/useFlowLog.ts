"use client";

import { useEffect, useMemo, useState } from "react";
import { createDemoData } from "./demo";
import { createId, emptyData, loadFlowLogData, saveFlowLogData } from "./storage";
import type { FlowEvent, FlowLogData, Medication } from "./types";

export function useFlowLog() {
  const [data, setData] = useState<FlowLogData>(emptyData);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setData(loadFlowLogData());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      saveFlowLogData(data);
      setError("");
    } catch {
      setError("Non riesco a salvare i dati nel browser.");
    }
  }, [data, loaded]);

  const actions = useMemo(
    () => ({
      addEvent(event: Omit<FlowEvent, "id" | "timestamp"> & { timestamp?: string }) {
        setData((current) => ({
          ...current,
          events: [
            {
              id: createId("evt"),
              timestamp: event.timestamp ?? new Date().toISOString(),
              ...event
            },
            ...current.events
          ]
        }));
      },
      deleteEvent(id: string) {
        setData((current) => ({
          ...current,
          events: current.events.filter((event) => event.id !== id)
        }));
      },
      addMedication(medication: Omit<Medication, "id">) {
        setData((current) => ({
          ...current,
          medications: [{ id: createId("med"), ...medication }, ...current.medications]
        }));
      },
      deleteMedication(id: string) {
        setData((current) => ({
          medications: current.medications.filter((medication) => medication.id !== id),
          events: current.events
        }));
      },
      resetDemo() {
        setData(createDemoData());
      },
      clearData() {
        setData(emptyData);
      }
    }),
    []
  );

  return { data, loaded, error, ...actions };
}
