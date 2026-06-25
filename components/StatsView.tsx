"use client";

import { average, getLastSevenDaysStats, getTrackedDays } from "@/lib/stats";
import type { FlowEvent } from "@/lib/types";

export function StatsView({ events }: { events: FlowEvent[] }) {
  const days = getLastSevenDaysStats(events);
  const maxWater = Math.max(1000, ...days.map((day) => day.waterMl));
  const maxUrine = Math.max(1, ...days.map((day) => day.urineCount));
  const maxUrge = Math.max(1, ...days.map((day) => day.urgeCount));
  const avgWater = Math.round(average(days.map((day) => day.waterMl)));
  const avgUrine = average(days.map((day) => day.urineCount)).toFixed(1);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-title-sm text-on-surface-variant/70">Ultimi 7 giorni</p>
        <h2 className="mt-1 text-headline-md font-semibold">Statistiche</h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Media acqua" value={`${avgWater} ml`} />
        <StatCard label="Media pipì" value={avgUrine} />
        <StatCard label="Giorni" value={String(getTrackedDays(events))} />
      </div>

      <section className="rounded-xl border border-surface-container bg-surface-container-lowest p-lg card-shadow">
        <h3 className="mb-5 text-title-sm font-semibold">Acqua totale</h3>
        <div className="space-y-3">
          {days.map((day) => (
            <Bar key={day.dateKey} label={shortDate(day.dateKey)} value={`${day.waterMl} ml`} percent={(day.waterMl / maxWater) * 100} className="bg-primary-container" />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-surface-container bg-surface-container-lowest p-lg card-shadow">
        <h3 className="mb-5 text-title-sm font-semibold">Numero pipì</h3>
        <div className="space-y-3">
          {days.map((day) => (
            <Bar key={day.dateKey} label={shortDate(day.dateKey)} value={String(day.urineCount)} percent={(day.urineCount / maxUrine) * 100} className="bg-secondary-container" />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-surface-container bg-surface-container-lowest p-lg card-shadow">
        <h3 className="mb-5 text-title-sm font-semibold">Stimoli “mi scappa”</h3>
        <div className="space-y-3">
          {days.map((day) => (
            <Bar key={day.dateKey} label={shortDate(day.dateKey)} value={String(day.urgeCount)} percent={(day.urgeCount / maxUrge) * 100} className="bg-secondary-container" />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface-container-low p-4 text-center">
      <p className="text-label-caps uppercase text-on-surface-variant">{label}</p>
      <p className="mt-2 text-title-sm font-semibold">{value}</p>
    </div>
  );
}

function Bar({ label, value, percent, className }: { label: string; value: string; percent: number; className: string }) {
  return (
    <div className="grid grid-cols-[48px_1fr_64px] items-center gap-3">
      <span className="text-xs text-on-surface-variant">{label}</span>
      <div className="h-3 overflow-hidden rounded-full bg-surface-container">
        <div className={`h-full rounded-full ${className}`} style={{ width: `${Math.max(4, percent)}%` }} />
      </div>
      <span className="text-right text-xs font-semibold">{value}</span>
    </div>
  );
}

function shortDate(dateKey: string) {
  return new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "2-digit" }).format(new Date(`${dateKey}T12:00:00`));
}
