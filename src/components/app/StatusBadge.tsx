import { STATUS_LABELS, type ApplicationStatus } from '~/shared/data/applications';

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  submitted: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
  applied: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  interview: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  offer: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

interface StatusBadgeProps {
  status: ApplicationStatus;
  uppercase?: boolean;
}

export default function StatusBadge({ status, uppercase = false }: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${uppercase ? 'uppercase tracking-wide' : ''} ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
