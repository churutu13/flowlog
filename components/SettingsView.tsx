"use client";

import { downloadCsv, eventsToCsv } from "@/lib/export";
import type { FlowEvent } from "@/lib/types";
import { Icon } from "./Icon";

type SettingsViewProps = {
  events: FlowEvent[];
  error: string;
  onResetDemo: () => void;
  onClearData: () => void;
};

export function SettingsView({ events, error, onResetDemo, onClearData }: SettingsViewProps) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-title-sm text-on-surface-variant/70">Dati locali</p>
        <h2 className="mt-1 text-headline-md font-semibold">Impostazioni</h2>
      </div>

      {error ? <div className="rounded-xl bg-error-container p-4 text-sm text-on-error-container">{error}</div> : null}

      <section className="space-y-3">
        <ActionButton icon="download" label="Esporta CSV" onClick={() => downloadCsv(eventsToCsv(events))} />
        <ActionButton icon="science" label="Reset dati demo" onClick={onResetDemo} />
        <ActionButton icon="delete_forever" label="Cancella tutto" danger onClick={onClearData} />
      </section>

      <div className="rounded-xl bg-surface-container-low p-lg text-sm text-on-surface-variant">
        I dati sono salvati solo nel localStorage di questo browser. Nessun backend è collegato in questa versione MVP.
      </div>
    </div>
  );
}

function ActionButton({ icon, label, danger = false, onClick }: { icon: string; label: string; danger?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`active-scale flex h-14 w-full items-center justify-between rounded-full px-5 font-semibold ${
        danger ? "bg-error-container text-on-error-container" : "bg-surface-container-lowest text-on-surface"
      }`}
    >
      <span>{label}</span>
      <Icon name={icon} />
    </button>
  );
}
