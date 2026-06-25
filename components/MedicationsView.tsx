"use client";

import type { Medication } from "@/lib/types";
import { MedicationForm } from "./Forms";
import { Icon } from "./Icon";

type MedicationsViewProps = {
  medications: Medication[];
  onAddMedication: (medication: Omit<Medication, "id">) => void;
  onDeleteMedication: (id: string) => void;
};

export function MedicationsView({ medications, onAddMedication, onDeleteMedication }: MedicationsViewProps) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-title-sm text-on-surface-variant/70">Farmaci e integratori</p>
        <h2 className="mt-1 text-headline-md font-semibold">Piano personale</h2>
      </div>

      <section className="rounded-xl border border-surface-container bg-surface-container-lowest p-lg card-shadow">
        <h3 className="mb-4 text-title-sm font-semibold">Aggiungi</h3>
        <MedicationForm onSubmit={onAddMedication} />
      </section>

      <section className="space-y-3">
        <h3 className="text-title-sm font-semibold">Lista</h3>
        {medications.length === 0 ? (
          <div className="rounded-xl bg-surface-container-low p-lg text-body-md text-on-surface-variant">Nessun farmaco o integratore salvato.</div>
        ) : (
          medications.map((medication) => (
            <article key={medication.id} className="flex items-start justify-between gap-4 rounded-xl border border-surface-container bg-surface-container-lowest p-5 card-shadow">
              <div>
                <p className="font-semibold">{medication.name}</p>
                <p className="text-sm text-on-surface-variant">{medication.dose || "Dose non indicata"} - {medication.usualTime}</p>
                <p className="mt-1 text-xs capitalize text-tertiary">{medication.frequency}</p>
                {medication.notes ? <p className="mt-2 text-sm text-on-surface-variant">{medication.notes}</p> : null}
              </div>
              <button type="button" onClick={() => onDeleteMedication(medication.id)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-error" aria-label="Cancella farmaco">
                <Icon name="delete" />
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
