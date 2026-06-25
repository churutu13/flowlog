"use client";

import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Tab = "dashboard" | "medications" | "stats" | "settings";

type ShellProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: ReactNode;
};

const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "medications", label: "Farmaci", icon: "medication" },
  { id: "stats", label: "Statistiche", icon: "analytics" },
  { id: "settings", label: "Impostazioni", icon: "settings" }
];

export function Shell({ activeTab, onTabChange, children }: ShellProps) {
  return (
    <div className="min-h-dvh bg-background text-on-surface">
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-surface px-margin-mobile">
        <div className="flex items-center gap-3">
          <img src="flowlog-logo.svg" alt="FlowLog" width={40} height={40} className="h-10 w-10 rounded-2xl" />
          <h1 className="text-display-lg-mobile font-bold text-primary">FlowLog</h1>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant">
          <Icon name="favorite" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-md px-margin-mobile pb-28 pt-4">{children}</main>

      <nav className="fixed bottom-0 z-50 flex h-20 w-full items-center justify-around rounded-t-xl bg-surface/90 px-4 shadow-lg backdrop-blur-md">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`active-scale flex min-w-16 flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? "text-primary" : "text-on-surface-variant"
              }`}
              aria-label={tab.label}
            >
              <Icon name={tab.icon} fill={isActive} />
              <span className="text-label-caps">{tab.label}</span>
              <span className={`h-1 w-1 rounded-full ${isActive ? "bg-primary" : "bg-transparent"}`} />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
