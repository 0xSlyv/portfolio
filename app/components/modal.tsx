'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, mounted, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl bg-main dark:bg-secondary rounded-xl p-8 shadow-2xl overflow-visible"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-20 p-2 rounded-full border border-hover bg-hover/50 hover:bg-hover transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-theme-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}
