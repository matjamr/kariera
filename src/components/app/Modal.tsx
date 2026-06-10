'use client';

import { useEffect } from 'react';
import { IconX } from '@tabler/icons-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  showClose?: boolean;
}

// Reusable overlay dialog used by the application wizard and confirmations.
export default function Modal({ open, onClose, children, maxWidth = 'max-w-xl', showClose = false }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full ${maxWidth} bg-white dark:bg-slate-800 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto`}
        onClick={(event) => event.stopPropagation()}
      >
        {showClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <IconX size={20} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
