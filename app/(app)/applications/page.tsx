'use client';

import { useRef, useState } from 'react';
import { IconBuildingSkyscraper, IconCalendarEvent, IconDotsVertical, IconPlus } from '@tabler/icons-react';
import ApplicationWizard from '~/components/app/ApplicationWizard';
import ConfirmDeleteModal from '~/components/app/ConfirmDeleteModal';
import StatusBadge from '~/components/app/StatusBadge';
import { useApplications } from '~/hooks/useApplications';
import { useOnClickOutside } from '~/hooks/useOnClickOutside';
import { formatAppliedDate, type JobApplication } from '~/shared/data/applications';

function daysAgo(iso: string): string {
  const days = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24)));
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  return formatAppliedDate(iso);
}

function cardMeta(application: JobApplication): string {
  if (application.note) return application.note;
  switch (application.status) {
    case 'rejected':
      return `Rejected ${formatAppliedDate(application.appliedAt)}`;
    case 'interview':
      return `Interview ${formatAppliedDate(application.appliedAt)}`;
    case 'offer':
      return `Offer ${formatAppliedDate(application.appliedAt)}`;
    default:
      return `Applied ${daysAgo(application.appliedAt)}`;
  }
}

function ApplicationCard({
  application,
  onEdit,
  onDelete,
}: {
  application: JobApplication;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => setMenuOpen(false));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
          <IconBuildingSkyscraper size={22} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={application.status} />
          <div className="relative" ref={menuRef}>
            <button
              aria-label="Application actions"
              onClick={() => setMenuOpen((open) => !open)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <IconDotsVertical size={18} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg py-1 z-20">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg text-slate-900 dark:text-white leading-snug">{application.position}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {application.company} • {application.location}
        </p>
      </div>

      <p className="mt-auto flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <IconCalendarEvent size={14} />
        {cardMeta(application)}
      </p>
    </div>
  );
}

export default function ApplicationsPage() {
  const { applications, ready, addApplication, updateApplication, removeApplication } = useApplications();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [editing, setEditing] = useState<JobApplication | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSubmit = (data: Omit<JobApplication, 'id'>) => {
    if (editing) {
      updateApplication(editing.id, data);
    } else {
      addApplication(data);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">My Applications</h1>
          <p className="text-slate-600 dark:text-slate-400">Browse and manage all your job applications.</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setWizardOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
        >
          <IconPlus size={18} />
          Create New
        </button>
      </div>

      {ready && applications.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-16 text-center">
          <span className="text-4xl">📭</span>
          <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">No applications yet</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Click “Create New” to add your first job application.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onEdit={() => {
                setEditing(application);
                setWizardOpen(true);
              }}
              onDelete={() => setDeletingId(application.id)}
            />
          ))}
        </div>
      )}

      <ApplicationWizard
        open={wizardOpen}
        initial={editing}
        onClose={() => setWizardOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteModal
        open={deletingId !== null}
        onCancel={() => setDeletingId(null)}
        onConfirm={() => {
          if (deletingId) removeApplication(deletingId);
          setDeletingId(null);
        }}
      />
    </div>
  );
}
