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
  const avgUrges = average(days.map((day) => day.urgeCount));
  const avgMlPerUrine = Math.round(average(days.map((day) => day.mlPerUrine ?? 0).filter((value) => value > 0)));
  const totalUnmatchedUrges = days.reduce((sum, day) => sum + day.unmatchedUrges, 0);
  const comparisonText = getComparisonText(avgWater, Number(avgUrine), avgUrges, totalUnmatchedUrges);

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
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-title-sm font-semibold">Confronto acqua-stimoli-pipì</h3>
            <p className="mt-1 text-body-md text-on-surface-variant">{comparisonText}</p>
          </div>
          <div className="shrink-0 rounded-full bg-primary-container px-3 py-1 text-xs font-semibold text-on-primary-container">{avgMlPerUrine || 0} ml/pipì</div>
        </div>
        <div className="space-y-4">
          {days.map((day) => (
            <ComparisonRow key={day.dateKey} day={day} maxWater={maxWater} maxUrine={maxUrine} maxUrge={maxUrge} />
          ))}
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        <InsightCard label="Acqua per pipì" value={`${avgMlPerUrine || 0} ml`} caption="Media sui giorni con almeno una pipì" />
        <InsightCard label="Stimoli per pipì" value={avgUrine === "0.0" ? "0" : `${(avgUrges / Number(avgUrine)).toFixed(1)}x`} caption="Quanto spesso lo stimolo diventa registrazione" />
        <InsightCard label="Stimoli in più" value={String(totalUnmatchedUrges)} caption="Stimoli oltre le pipì negli ultimi 7 giorni" />
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

type ComparisonRowProps = {
  day: ReturnType<typeof getLastSevenDaysStats>[number];
  maxWater: number;
  maxUrine: number;
  maxUrge: number;
};

function ComparisonRow({ day, maxWater, maxUrine, maxUrge }: ComparisonRowProps) {
  const waterPercent = (day.waterMl / maxWater) * 100;
  const urgePercent = (day.urgeCount / maxUrge) * 100;
  const urinePercent = (day.urineCount / maxUrine) * 100;
  const balance = getDayBalance(day.urgeCount, day.urineCount);

  return (
    <div className="grid gap-2 rounded-lg bg-surface-container-low p-3 sm:grid-cols-[56px_1fr_92px] sm:items-center">
      <div className="text-xs font-semibold text-on-surface-variant">{shortDate(day.dateKey)}</div>
      <div className="space-y-2">
        <MiniMetric label="Bevuto" value={`${day.waterMl} ml`} percent={waterPercent} className="bg-primary-container" />
        <MiniMetric label="Scappa" value={String(day.urgeCount)} percent={urgePercent} className="bg-tertiary-container" />
        <MiniMetric label="Fatta" value={String(day.urineCount)} percent={urinePercent} className="bg-secondary-container" />
      </div>
      <div className="rounded-full bg-surface-container px-3 py-1 text-center text-xs font-semibold text-on-surface-variant">{balance}</div>
    </div>
  );
}

function MiniMetric({ label, value, percent, className }: { label: string; value: string; percent: number; className: string }) {
  return (
    <div className="grid grid-cols-[54px_1fr_58px] items-center gap-2">
      <span className="text-xs text-on-surface-variant">{label}</span>
      <div className="h-2 overflow-hidden rounded-full bg-surface-container">
        <div className={`h-full rounded-full ${className}`} style={{ width: `${Math.max(4, Math.min(100, percent))}%` }} />
      </div>
      <span className="text-right text-xs font-semibold">{value}</span>
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

function InsightCard({ label, value, caption }: { label: string; value: string; caption: string }) {
  return (
    <div className="rounded-xl bg-surface-container-low p-4">
      <p className="text-label-caps uppercase text-on-surface-variant">{label}</p>
      <p className="mt-2 text-title-sm font-semibold">{value}</p>
      <p className="mt-1 text-xs text-on-surface-variant">{caption}</p>
    </div>
  );
}

function Bar({ label, value, percent, className }: { label: string; value: string; percent: number; className: string }) {
  return (
    <div className="grid grid-cols-[48px_1fr_64px] items-center gap-3">
      <span className="text-xs text-on-surface-variant">{label}</span>
      <div className="h-3 overflow-hidden rounded-full bg-surface-container">
        <div className={`h-full rounded-full ${className}`} style={{ width: `${Math.max(4, Math.min(100, percent))}%` }} />
      </div>
      <span className="text-right text-xs font-semibold">{value}</span>
    </div>
  );
}

function shortDate(dateKey: string) {
  return new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "2-digit" }).format(new Date(`${dateKey}T12:00:00`));
}

function getDayBalance(urgeCount: number, urineCount: number) {
  if (urgeCount === 0 && urineCount === 0) return "nessun dato";
  if (urgeCount > urineCount) return `+${urgeCount - urineCount} stimoli`;
  if (urineCount > urgeCount) return `+${urineCount - urgeCount} pipì`;
  return "allineato";
}

function getComparisonText(avgWater: number, avgUrine: number, avgUrges: number, totalUnmatchedUrges: number) {
  if (avgWater === 0 && avgUrine === 0 && avgUrges === 0) return "Ancora pochi dati: registra acqua, stimoli e pipì per vedere il confronto.";
  if (totalUnmatchedUrges > 0) return "Negli ultimi giorni ci sono stati più stimoli che pipì registrate: il confronto li evidenzia giorno per giorno.";
  if (avgWater > 0 && avgUrine > 0) return "Acqua bevuta e pipì registrate sono confrontate insieme, così vedi quando si muovono nella stessa direzione.";
  return "Il confronto si aggiorna appena ci sono dati su acqua, stimoli e pipì nello stesso periodo.";
}
