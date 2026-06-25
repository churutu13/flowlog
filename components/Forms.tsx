"use client";

import { useState } from "react";
import type { Medication, UrineColor } from "@/lib/types";

const waterAmounts = [100, 200, 250, 330, 500];
const urineColors: UrineColor[] = ["chiaro", "giallo", "scuro"];

export function WaterForm({ onSubmit }: { onSubmit: (amountMl: number) => void }) {
  const [amountMl, setAmountMl] = useState(250);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(amountMl);
      }}
    >
      <div>
        <label className="mb-3 block text-label-caps uppercase text-outline">Quantità</label>
        <div className="grid grid-cols-5 gap-2">
          {waterAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setAmountMl(amount)}
              className={`h-12 rounded-full text-sm font-semibold ${
                amountMl === amount ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant"
              }`}
            >
              {amount}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" className="h-14 w-full rounded-full bg-primary text-on-primary font-semibold">
        Salva acqua
      </button>
    </form>
  );
}

export function UrineForm({
  onSubmit
}: {
  onSubmit: (values: { urgency?: number; urineColor?: UrineColor; notes?: string }) => void;
}) {
  const [urgency, setUrgency] = useState(3);
  const [urineColor, setUrineColor] = useState<UrineColor>("giallo");
  const [notes, setNotes] = useState("");

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ urgency, urineColor, notes: notes.trim() || undefined });
      }}
    >
      <div>
        <label className="mb-3 block text-label-caps uppercase text-outline">Urgenza</label>
        <input type="range" min={1} max={5} value={urgency} onChange={(event) => setUrgency(Number(event.target.value))} className="w-full accent-primary" />
        <div className="mt-1 flex justify-between text-label-caps text-outline">
          <span>1</span>
          <span className="font-semibold text-primary">{urgency}</span>
          <span>5</span>
        </div>
      </div>
      <div>
        <label className="mb-3 block text-label-caps uppercase text-outline">Colore urine</label>
        <div className="grid grid-cols-3 gap-2">
          {urineColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setUrineColor(color)}
              className={`h-12 rounded-full capitalize ${
                urineColor === color ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container text-on-surface-variant"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Nota opzionale"
        className="min-h-24 w-full rounded-3xl border-0 bg-surface-container-low px-5 py-4 focus:ring-2 focus:ring-primary-container"
      />
      <button type="submit" className="h-14 w-full rounded-full bg-secondary text-on-secondary font-semibold">
        Salva pipì
      </button>
    </form>
  );
}

export function MedicationTakenForm({
  medications,
  onSubmit
}: {
  medications: Medication[];
  onSubmit: (medication: Medication) => void;
}) {
  const [medicationId, setMedicationId] = useState(medications[0]?.id ?? "");
  const selected = medications.find((medication) => medication.id === medicationId);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (selected) onSubmit(selected);
      }}
    >
      <label className="block">
        <span className="mb-2 block text-label-caps uppercase text-outline">Farmaco/integratore</span>
        <select
          value={medicationId}
          onChange={(event) => setMedicationId(event.target.value)}
          className="h-14 w-full rounded-full border-0 bg-surface-container-low px-5 focus:ring-2 focus:ring-tertiary-container"
        >
          {medications.map((medication) => (
            <option key={medication.id} value={medication.id}>
              {medication.name} - {medication.dose}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={!selected} className="h-14 w-full rounded-full bg-tertiary text-on-tertiary font-semibold disabled:opacity-40">
        Segna preso
      </button>
    </form>
  );
}

export function MedicationForm({ onSubmit }: { onSubmit: (medication: Omit<Medication, "id">) => void }) {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [usualTime, setUsualTime] = useState("08:00");
  const [frequency, setFrequency] = useState<Medication["frequency"]>("giornaliera");
  const [notes, setNotes] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim()) return;
        onSubmit({ name: name.trim(), dose: dose.trim(), usualTime, frequency, notes: notes.trim() });
        setName("");
        setDose("");
        setNotes("");
      }}
    >
      <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nome" className="h-14 w-full rounded-full border-0 bg-surface-container-low px-5 focus:ring-2 focus:ring-primary-container" required />
      <input value={dose} onChange={(event) => setDose(event.target.value)} placeholder="Dose" className="h-14 w-full rounded-full border-0 bg-surface-container-low px-5 focus:ring-2 focus:ring-primary-container" />
      <div className="grid grid-cols-2 gap-3">
        <input type="time" value={usualTime} onChange={(event) => setUsualTime(event.target.value)} className="h-14 rounded-full border-0 bg-surface-container-low px-5 focus:ring-2 focus:ring-primary-container" />
        <select value={frequency} onChange={(event) => setFrequency(event.target.value as Medication["frequency"])} className="h-14 rounded-full border-0 bg-surface-container-low px-5 focus:ring-2 focus:ring-primary-container">
          <option value="giornaliera">Giornaliera</option>
          <option value="al bisogno">Al bisogno</option>
        </select>
      </div>
      <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Note" className="min-h-20 w-full rounded-3xl border-0 bg-surface-container-low px-5 py-4 focus:ring-2 focus:ring-primary-container" />
      <button type="submit" className="h-14 w-full rounded-full bg-primary text-on-primary font-semibold">
        Aggiungi
      </button>
    </form>
  );
}
