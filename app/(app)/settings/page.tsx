'use client';

import { useEffect, useState } from 'react';
import { IconBriefcase, IconCheck, IconEye, IconPencil, IconUserCircle } from '@tabler/icons-react';
import { useAuth } from '~/components/app/AuthProvider';

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';

const JOB_LEVELS = ['Junior Level', 'Mid Level', 'Senior Level', 'Lead / Manager'];
const SALARIES = ['$60k - $90k', '$90k - $120k', '$120k - $150k', '$150k+'];
const LOCATIONS = ['Remote - Worldwide', 'Remote - Europe', 'Hybrid - Warsaw', 'On-site - Warsaw'];

const STORAGE_KEY = 'kariera-profile';

interface ProfileSettings {
  fullName: string;
  email: string;
  headline: string;
  jobLevel: string;
  salary: string;
  location: string;
  publicProfile: boolean;
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileSettings>({
    fullName: '',
    email: '',
    headline: '',
    jobLevel: JOB_LEVELS[2],
    salary: SALARIES[2],
    location: LOCATIONS[0],
    publicProfile: true,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let stored: Partial<ProfileSettings> = {};
    try {
      stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<ProfileSettings>;
    } catch {
      /* ignore corrupted storage */
    }
    setProfile((current) => ({
      ...current,
      fullName: stored.fullName ?? user?.displayName ?? '',
      email: stored.email ?? user?.email ?? '',
      ...stored,
    }));
  }, [user]);

  const update = (changes: Partial<ProfileSettings>) => {
    setProfile((current) => ({ ...current, ...changes }));
    setSaved(false);
  };

  const handleSave = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSaved(true);
  };

  const initials = (profile.fullName || profile.email || 'U')
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Profile Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your recruitment presence and preferences.</p>
      </div>

      {/* Profile information */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
            <IconUserCircle size={20} className="text-indigo-600 dark:text-indigo-400" />
            Profile Information
          </h2>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
          >
            {saved && <IconCheck size={16} />}
            {saved ? 'Saved' : 'Save Changes'}
          </button>
        </div>

        <div className="p-6 flex flex-col sm:flex-row gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-semibold">
                {initials}
              </div>
              <span className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                <IconPencil size={14} className="text-white" />
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Profile Photo</p>
            <p className="text-xs text-slate-400">PNG or JPG, max 10MB</p>
          </div>

          {/* Fields */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
              <input
                value={profile.fullName}
                onChange={(e) => update({ fullName: e.target.value })}
                className={inputClass}
                placeholder="Alexander Sterling"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => update({ email: e.target.value })}
                className={inputClass}
                placeholder="a.sterling@kariera-corp.com"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Professional Headline
              </label>
              <input
                value={profile.headline}
                onChange={(e) => update({ headline: e.target.value })}
                className={inputClass}
                placeholder="e.g. Senior Full Stack Engineer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Job search preferences */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
            <IconBriefcase size={20} className="text-indigo-600 dark:text-indigo-400" />
            Job Search Preferences
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Job Level</label>
            <select
              value={profile.jobLevel}
              onChange={(e) => update({ jobLevel: e.target.value })}
              className={inputClass}
            >
              {JOB_LEVELS.map((level) => (
                <option key={level}>{level}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Desired Salary (Annual)
            </label>
            <select value={profile.salary} onChange={(e) => update({ salary: e.target.value })} className={inputClass}>
              {SALARIES.map((salary) => (
                <option key={salary}>{salary}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Preferred Location
            </label>
            <select
              value={profile.location}
              onChange={(e) => update({ location: e.target.value })}
              className={inputClass}
            >
              {LOCATIONS.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Public profile */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
          <IconEye size={20} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-slate-900 dark:text-white">Public Profile</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            When enabled, your profile, experience, and skills will be visible to verified recruiters in our network.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`text-xs font-bold tracking-widest uppercase ${
              profile.publicProfile ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
            }`}
          >
            {profile.publicProfile ? 'Enabled' : 'Disabled'}
          </span>
          <button
            role="switch"
            aria-checked={profile.publicProfile}
            onClick={() => update({ publicProfile: !profile.publicProfile })}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              profile.publicProfile ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${
                profile.publicProfile ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Delete Account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Permanently remove your account and all associated data.
          </p>
        </div>
        <button className="px-5 py-2.5 rounded-lg border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-fit">
          Deactivate Profile
        </button>
      </div>
    </div>
  );
}
