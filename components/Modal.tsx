"use client";

import type { ReactNode } from "react";
import { Icon } from "./Icon";

type ModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ title, open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-on-surface/30 px-4 pb-4">
      <section className="w-full max-w-md rounded-xl bg-surface p-margin-mobile shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-title-sm font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="active-scale flex h-10 w-10 items-center justify-center rounded-full bg-surface-container"
            aria-label="Chiudi"
          >
            <Icon name="close" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
