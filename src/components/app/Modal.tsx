'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconX } from '@tabler/icons-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  showClose?: boolean;
}

// Reusable overlay dialog used by the application wizard and confirmations.
// Rendered through a portal into <body>; the app shell (#app-shell) gets a real
// CSS blur while the modal is open — backdrop-filter can't blur fixed-position
// elements (the app header) in Chromium, which left an unblurred strip on top.
export default function Modal({ open, onClose, children, maxWidth = 'max-w-xl', showClose = false }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50"
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
    </div>,
    document.body,
  );
}
