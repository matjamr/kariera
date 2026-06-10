'use client';

import { useState } from 'react';
import { IconCalendarEvent, IconClock, IconCopy, IconCheck, IconExternalLink, IconVideo } from '@tabler/icons-react';
import Modal from '~/components/app/Modal';

export interface MeetingDetails {
  title: string;
  time: string;
  platform: string;
  participants?: string[];
  link: string;
}

interface MeetingModalProps {
  open: boolean;
  meeting: MeetingDetails;
  onClose: () => void;
}

export default function MeetingModal({ open, meeting, onClose }: MeetingModalProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(meeting.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md" showClose>
      <div className="p-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
          <IconVideo size={24} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{meeting.title}</h2>

        <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <p className="flex items-center gap-2">
            <IconClock size={16} className="text-slate-400" />
            {meeting.time}
          </p>
          <p className="flex items-center gap-2">
            <IconCalendarEvent size={16} className="text-slate-400" />
            {meeting.platform}
          </p>
          {meeting.participants && meeting.participants.length > 0 && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Participants: {meeting.participants.join(', ')}
            </p>
          )}
        </div>

        <div className="mt-5 px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
          <span className="flex-1 text-xs text-slate-500 dark:text-slate-400 truncate">{meeting.link}</span>
          <button
            onClick={copyLink}
            aria-label="Copy meeting link"
            className="p-1.5 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors shrink-0"
          >
            {copied ? <IconCheck size={16} className="text-green-600" /> : <IconCopy size={16} />}
          </button>
        </div>
      </div>

      <div className="px-8 py-5 bg-slate-50 dark:bg-slate-800/60 rounded-b-xl border-t border-slate-100 dark:border-slate-700 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
        >
          Close
        </button>
        <a
          href={meeting.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
        >
          Join meeting
          <IconExternalLink size={16} />
        </a>
      </div>
    </Modal>
  );
}
