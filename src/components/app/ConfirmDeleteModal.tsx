'use client';

import { IconAlertTriangle } from '@tabler/icons-react';
import Modal from '~/components/app/Modal';

interface ConfirmDeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({ open, onCancel, onConfirm }: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} onClose={onCancel} maxWidth="max-w-md">
      <div className="p-8 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-5">
          <IconAlertTriangle size={28} className="text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Delete application</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Are you sure you want to delete this application? This action cannot be undone.
        </p>
      </div>
      <div className="px-8 py-5 bg-slate-50 dark:bg-slate-800/60 rounded-b-xl border-t border-slate-100 dark:border-slate-700 flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 px-4 rounded-lg bg-red-700 hover:bg-red-800 text-white font-medium transition-colors"
        >
          Yes, delete
        </button>
      </div>
    </Modal>
  );
}
