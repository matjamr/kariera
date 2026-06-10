export type ApplicationStatus = 'submitted' | 'applied' | 'interview' | 'offer' | 'rejected';

export interface JobApplication {
  id: string;
  position: string;
  company: string;
  location: string;
  industry: string;
  appliedAt: string; // ISO date
  status: ApplicationStatus;
  link?: string;
  note?: string;
}

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  submitted: 'Submitted',
  applied: 'Applied',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
};

export const SEED_APPLICATIONS: JobApplication[] = [
  {
    id: 'seed-1',
    position: 'Senior Product Designer',
    company: 'Stripe',
    location: 'Remote',
    industry: 'FinTech',
    appliedAt: '2026-06-08',
    status: 'applied',
    link: 'https://stripe.com/jobs/listing/sr-designer-123',
  },
  {
    id: 'seed-2',
    position: 'Lead Engineering Manager',
    company: 'Figma',
    location: 'San Francisco',
    industry: 'Software & AI',
    appliedAt: '2026-05-28',
    status: 'interview',
    note: 'Interview Oct 24',
  },
  {
    id: 'seed-3',
    position: 'Frontend Developer',
    company: 'Notion',
    location: 'Warsaw',
    industry: 'Software & AI',
    appliedAt: '2026-06-05',
    status: 'applied',
  },
  {
    id: 'seed-4',
    position: 'Backend Engineer',
    company: 'Google',
    location: 'Remote',
    industry: 'Software & AI',
    appliedAt: '2026-05-20',
    status: 'interview',
    note: 'Offer Nov 1',
  },
  {
    id: 'seed-5',
    position: 'iOS Developer',
    company: 'Apple',
    location: 'Cupertino',
    industry: 'Consumer Tech',
    appliedAt: '2026-05-31',
    status: 'applied',
  },
  {
    id: 'seed-6',
    position: 'Product Manager',
    company: 'Spotify',
    location: 'Stockholm',
    industry: 'Media',
    appliedAt: '2026-03-15',
    status: 'rejected',
  },
];

export function formatAppliedDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
