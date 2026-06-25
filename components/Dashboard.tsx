"use client";

import { formatLongDate, formatTime, isToday, sortEventsDesc } from "@/lib/date";
import type { FlowEvent, Medication } from "@/lib/types";
import { Icon } from "./Icon";

type DashboardProps = {
  events: FlowEvent[];
  medications: Medication[];
  onQuickWater: () => void;
  onQuickUrine: () => void;
  onQuickMedication: () => void;
  onDeleteEvent: (id: string) => void;
};

function eventTitle(event: FlowEvent) {
  if (event.type === "water") return `${event.amountMl ?? 0} ml Acqua`;
  if (event.type === "urine") return "Pipì";
  if (event.type === "urge") return "Mi scappa";
  return event.medicationName ?? "Farmaco";
}

function eventDetail(event: FlowEvent) {
  if (event.type === "water") return event.notes || "Idratazione";
  if (event.type === "urine") {
    const parts = [
      event.urgency ? `Urgenza ${event.urgency}/5` : "",
      event.streamStrength ? `Getto ${event.streamStrength}/5` : "",
      event.urineColor ? `Colore ${event.urineColor}` : "",
      event.notes ?? ""
    ].filter(Boolean);
    return parts.join(" - ") || "Registrazione minzione";
  }
  if (event.type === "urge") {
    const parts = [event.urgency ? `Urgenza ${event.urgency}/5` : "", event.notes ?? ""].filter(Boolean);
    return parts.join(" - ") || "Stimolo registrato";
  }
  return [event.dose, event.notes].filter(Boolean).join(" - ") || "Assunzione registrata";
}

function eventAccent(type: FlowEvent["type"]) {
  if (type === "water") return "bg-primary text-primary";
  if (type === "urine") return "bg-secondary text-secondary";
  if (type === "urge") return "bg-secondary-container text-secondary";
  return "bg-tertiary text-tertiary";
}

export function Dashboard({ events, medications, onQuickWater, onQuickUrine, onQuickMedication, onDeleteEvent }: DashboardProps) {
  const todayEvents = sortEventsDesc(events.filter((event) => isToday(event.timestamp)));
  const waterTotal = todayEvents.reduce((sum, event) => sum + (event.type === "water" ? event.amountMl ?? 0 : 0), 0);
  const urineCount = todayEvents.filter((event) => event.type === "urine").length;
  const urgeCount = todayEvents.filter((event) => event.type === "urge").length;
  const plannedMeds = medications.filter((medication) => medication.frequency === "giornaliera");
  const takenMedicationIds = new Set(todayEvents.filter((event) => event.type === "medication").map((event) => event.medicationId));
  const takenCount = plannedMeds.filter((medication) => takenMedicationIds.has(medication.id)).length;
  const waterPercent = Math.min(100, Math.round((waterTotal / 2000) * 100));
  const medsPercent = plannedMeds.length ? Math.round((takenCount / plannedMeds.length) * 100) : 0;

  return (
    <>
      <div className="mb-6">
        <p className="text-title-sm capitalize text-on-surface-variant/70">Oggi, {formatLongDate()}</p>
        <h2 className="mt-1 text-headline-md font-semibold">Ciao, bentornato</h2>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4">
        <section className="active-scale rounded-xl border border-surface-container bg-surface-container-lowest p-lg card-shadow">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="mb-1 text-label-caps uppercase text-on-surface-variant">Acqua</p>
              <h3 className="text-display-lg font-bold text-primary">
                {(waterTotal / 1000).toFixed(2)}L <span className="text-lg text-on-surface-variant/40">/ 2.0L</span>
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/20">
              <Icon name="water_drop" fill className="text-2xl text-primary" />
            </div>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container">
            <div className="h-full rounded-full bg-primary-container" style={{ width: `${waterPercent}%` }} />
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <section className="active-scale flex min-h-40 flex-col justify-between rounded-xl border border-surface-container bg-surface-container-lowest p-lg card-shadow">
            <div className="mb-6 flex items-start justify-between">
              <Icon name="opacity" className="text-2xl text-secondary" />
              <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-bold text-secondary">Oggi</span>
            </div>
            <div>
              <h3 className="text-headline-md font-semibold">{urineCount} volte</h3>
              <p className="text-body-md text-on-surface-variant">{urgeCount} stimoli</p>
            </div>
          </section>

          <section className="active-scale flex min-h-40 flex-col justify-between rounded-xl border border-surface-container bg-surface-container-lowest p-lg card-shadow">
            <div className="mb-2 flex items-start justify-between">
              <Icon name="pill" className="text-2xl text-tertiary" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-tertiary-container/30">
                <p className="text-[10px] font-bold text-tertiary">
                  {takenCount}/{plannedMeds.length}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-headline-md font-semibold">Pillole</h3>
              <p className="text-body-md text-on-surface-variant">{takenCount} di {plannedMeds.length} prese</p>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
              <div className="h-full rounded-full bg-tertiary-container" style={{ width: `${medsPercent}%` }} />
            </div>
          </section>
        </div>
      </div>

      <section className="mb-10">
        <h4 className="mb-4 text-title-sm font-semibold">Azioni rapide</h4>
        <div className="flex items-center justify-between gap-4">
          <QuickAction label="+ Bevo" icon="add" className="bg-primary-container text-on-primary-container" onClick={onQuickWater} />
          <QuickAction label="+ Pipì" icon="water_full" className="bg-secondary-container text-on-secondary-container" onClick={onQuickUrine} />
          <QuickAction label="+ Pastiglia" icon="medication" className="bg-tertiary-container text-on-tertiary-container" onClick={onQuickMedication} />
        </div>
      </section>

      <section>
        <h4 className="mb-4 text-title-sm font-semibold">Timeline</h4>
        {todayEvents.length === 0 ? (
          <div className="rounded-xl bg-surface-container-low p-lg text-body-md text-on-surface-variant">Nessun evento registrato oggi.</div>
        ) : (
          <div className="space-y-4">
            {todayEvents.map((event, index) => {
              const accent = eventAccent(event.type);
              return (
                <div key={event.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`mt-2 h-2 w-2 rounded-full ${accent.split(" ")[0]}`} />
                    <div className={`my-1 w-0.5 bg-surface-container-highest ${index === todayEvents.length - 1 ? "h-6 opacity-0" : "h-12"}`} />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-3 rounded-lg bg-surface-container-low p-4">
                    <div className="min-w-0">
                      <p className="text-body-md font-semibold">{formatTime(event.timestamp)} - {eventTitle(event)}</p>
                      <p className="truncate text-xs text-on-surface-variant">{eventDetail(event)}</p>
                    </div>
                    <button type="button" onClick={() => onDeleteEvent(event.id)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-error" aria-label="Cancella evento">
                      <Icon name="delete" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

function QuickAction({ label, icon, className, onClick }: { label: string; icon: string; className: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="active-scale flex flex-1 flex-col items-center gap-2">
      <div className={`flex h-16 w-16 items-center justify-center rounded-full shadow-md ${className}`}>
        <Icon name={icon} className="text-2xl" />
      </div>
      <span className="text-label-caps">{label}</span>
    </button>
  );
}
