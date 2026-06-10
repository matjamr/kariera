'use client';

import { useEffect, useRef, useState } from 'react';
import {
  IconArrowLeft,
  IconArrowRight,
  IconBuildingSkyscraper,
  IconCloudUpload,
  IconFileDescription,
  IconFileText,
  IconLink,
  IconTrash,
} from '@tabler/icons-react';
import Modal from '~/components/app/Modal';
import { useAuth } from '~/components/app/AuthProvider';
import { STATUS_LABELS, type ApplicationStatus, type JobApplication } from '~/shared/data/applications';

const INDUSTRIES = ['Software Engineering', 'Software & AI', 'FinTech', 'E-commerce', 'Media', 'Consumer Tech', 'Logistics', 'Other'];

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';

interface AttachmentInfo {
  name: string;
  size: string;
}

interface ApplicationWizardProps {
  open: boolean;
  initial?: JobApplication | null;
  onClose: () => void;
  onSubmit: (application: Omit<JobApplication, 'id'>) => void;
}

const STEP_TITLES = ['Step 1 of 3: Find Company', 'Step 2 of 3: Basic Information', 'Step 3 of 3: Documents & Summary'];

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function ApplicationWizard({ open, initial, onClose, onSubmit }: ApplicationWizardProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('submitted');
  const [appliedAt, setAppliedAt] = useState('');
  const [link, setLink] = useState('');
  const [attachments, setAttachments] = useState<AttachmentInfo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setCompany(initial?.company ?? '');
    setIndustry(initial?.industry ?? INDUSTRIES[0]);
    setLocation(initial?.location ?? '');
    setWebsite('');
    setPosition(initial?.position ?? '');
    setStatus(initial?.status ?? 'submitted');
    setAppliedAt(initial?.appliedAt ?? new Date().toISOString().slice(0, 10));
    setLink(initial?.link ?? '');
    setAttachments([]);
  }, [open, initial]);

  const buildApplication = (): Omit<JobApplication, 'id'> => ({
    company: company.trim() || 'Unknown company',
    industry,
    location: location.trim() || 'Remote',
    position: position.trim() || 'Untitled position',
    status,
    appliedAt: appliedAt || new Date().toISOString().slice(0, 10),
    link: link.trim() || undefined,
    note: initial?.note,
  });

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files).map((file) => ({ name: file.name, size: formatFileSize(file.size) }));
    setAttachments((current) => [...current, ...next]);
  };

  const canContinueStep1 = company.trim().length > 0;
  const canContinueStep2 = position.trim().length > 0;

  const companyPreview = company.trim() && (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
      <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-semibold">
        {company.trim()[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
          {company} <span className="text-amber-500 font-medium">★ 4.8</span>
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{industry}</p>
      </div>
      <button
        type="button"
        onClick={() => setStep(1)}
        className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
      >
        Change
      </button>
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-xl" showClose>
      {/* Header + progress */}
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {initial ? 'Edit Job Application' : 'Add Job Application'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{STEP_TITLES[step - 1]}</p>
      </div>
      <div className="h-1 bg-slate-100 dark:bg-slate-700">
        <div
          className="h-1 bg-indigo-600 rounded-r transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="px-6 py-6 space-y-5">
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Which company are you applying to?
              </label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputClass}
                placeholder="TechFlow Solutions"
                autoFocus
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Industry</label>
                <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={inputClass}>
                  {INDUSTRIES.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={inputClass}
                  placeholder="Warsaw / Remote"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Company website / LinkedIn
              </label>
              <div className="relative">
                <IconLink size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className={`${inputClass} pl-9`}
                  placeholder="https://techflow.com"
                />
              </div>
            </div>
            {companyPreview}
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-2">Coming up next</p>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-sm">
                <IconFileDescription size={18} />
                Step 2: Application Information
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Position Title
              </label>
              <input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className={inputClass}
                placeholder="Senior Product Designer"
                autoFocus
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                  className={inputClass}
                >
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Date Applied
                </label>
                <input
                  type="date"
                  value={appliedAt}
                  onChange={(e) => setAppliedAt(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Job Posting Link
              </label>
              <div className="relative">
                <IconLink size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className={`${inputClass} pl-9`}
                  placeholder="https://stripe.com/jobs/listing/sr-designer-123"
                />
              </div>
            </div>
            {companyPreview}
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-2">Coming up next</p>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-sm">
                <IconFileText size={18} />
                Step 3: Attach CV and Cover Letter
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
            <div className="sm:col-span-3 space-y-4">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Attachments (CV &amp; Cover Letter)
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-6 py-10 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-colors flex flex-col items-center gap-2 text-center"
              >
                <span className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                  <IconCloudUpload size={20} className="text-indigo-600 dark:text-indigo-400" />
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Drag and drop files here
                </span>
                <span className="text-xs text-slate-400">or browse from your device</span>
                <span className="text-[10px] text-slate-400">Supported formats: PDF, DOCX (max. 10MB)</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />

              {attachments.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <IconFileText size={18} className="text-red-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-xs text-slate-400">{file.size} • Ready to send</p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => setAttachments((current) => current.filter((_, i) => i !== index))}
                    className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="sm:col-span-2 bg-indigo-50/60 dark:bg-indigo-900/10 rounded-lg p-4 space-y-4 h-fit">
              <p className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">Summary</p>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-1">Position</p>
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{position || '—'}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {industry} • {location || 'Remote'}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-1">Candidate</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user?.displayName ?? 'You'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-1">Company</p>
                <div className="flex items-center gap-2">
                  <IconBuildingSkyscraper size={16} className="text-slate-400" />
                  <p className="text-sm text-slate-700 dark:text-slate-300">{company || '—'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-3">
        {step === 1 ? (
          <button
            onClick={onClose}
            className="flex items-center gap-2 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <IconArrowLeft size={16} />
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <IconArrowLeft size={16} />
            Back
          </button>
        )}

        <div className="flex items-center gap-3">
          {step < 3 ? (
            <>
              <button
                onClick={() => {
                  onSubmit({ ...buildApplication(), status: 'submitted' });
                  onClose();
                }}
                disabled={!canContinueStep1}
                className="py-2.5 px-4 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 disabled:opacity-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 ? !canContinueStep1 : !canContinueStep2}
                className="flex items-center gap-2 py-2.5 px-5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
              >
                Next Step
                <IconArrowRight size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                className="py-2.5 px-4 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onSubmit(buildApplication());
                  onClose();
                }}
                className="py-2.5 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
