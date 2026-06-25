"use client";

import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { MedicationTakenForm, UrineForm, WaterForm } from "@/components/Forms";
import { MedicationsView } from "@/components/MedicationsView";
import { Modal } from "@/components/Modal";
import { SettingsView } from "@/components/SettingsView";
import { Shell } from "@/components/Shell";
import { StatsView } from "@/components/StatsView";
import { useFlowLog } from "@/lib/useFlowLog";

type Tab = "dashboard" | "medications" | "stats" | "settings";
type QuickModal = "water" | "urine" | "medication" | null;

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [quickModal, setQuickModal] = useState<QuickModal>(null);
  const {
    data,
    loaded,
    error,
    addEvent,
    deleteEvent,
    addMedication,
    deleteMedication,
    resetDemo,
    clearData
  } = useFlowLog();

  return (
    <Shell activeTab={activeTab} onTabChange={setActiveTab}>
      {!loaded ? (
        <div className="rounded-xl bg-surface-container-low p-lg text-body-md text-on-surface-variant">Caricamento dati...</div>
      ) : (
        <>
          {activeTab === "dashboard" ? (
            <Dashboard
              events={data.events}
              medications={data.medications}
              onQuickWater={() => setQuickModal("water")}
              onQuickUrine={() => setQuickModal("urine")}
              onQuickMedication={() => setQuickModal("medication")}
              onDeleteEvent={deleteEvent}
            />
          ) : null}

          {activeTab === "medications" ? (
            <MedicationsView medications={data.medications} onAddMedication={addMedication} onDeleteMedication={deleteMedication} />
          ) : null}

          {activeTab === "stats" ? <StatsView events={data.events} /> : null}

          {activeTab === "settings" ? (
            <SettingsView events={data.events} error={error} onResetDemo={resetDemo} onClearData={clearData} />
          ) : null}
        </>
      )}

      <Modal title="Aggiungi acqua" open={quickModal === "water"} onClose={() => setQuickModal(null)}>
        <WaterForm
          onSubmit={(amountMl) => {
            addEvent({ type: "water", amountMl });
            setQuickModal(null);
          }}
        />
      </Modal>

      <Modal title="Aggiungi pipì" open={quickModal === "urine"} onClose={() => setQuickModal(null)}>
        <UrineForm
          onSubmit={(values) => {
            addEvent({ type: "urine", ...values });
            setQuickModal(null);
          }}
          onUrge={(values) => {
            addEvent({ type: "urge", ...values });
            setQuickModal(null);
          }}
        />
      </Modal>

      <Modal title="Segna pastiglia" open={quickModal === "medication"} onClose={() => setQuickModal(null)}>
        {data.medications.length === 0 ? (
          <div className="space-y-4">
            <p className="text-body-md text-on-surface-variant">Aggiungi prima un farmaco o integratore nella sezione Farmaci.</p>
            <button
              type="button"
              onClick={() => {
                setQuickModal(null);
                setActiveTab("medications");
              }}
              className="h-14 w-full rounded-full bg-tertiary text-on-tertiary font-semibold"
            >
              Vai a Farmaci
            </button>
          </div>
        ) : (
          <MedicationTakenForm
            medications={data.medications}
            onSubmit={(medication) => {
              addEvent({
                type: "medication",
                medicationId: medication.id,
                medicationName: medication.name,
                dose: medication.dose,
                notes: medication.notes
              });
              setQuickModal(null);
            }}
          />
        )}
      </Modal>
    </Shell>
  );
}
