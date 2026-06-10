import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help center',
};

const faqs = [
  {
    question: 'How do I add a new job application?',
    answer:
      'Go to My Applications and click "Create New". The three-step wizard will guide you through the company details, application information and attachments.',
  },
  {
    question: 'How do I reset my password?',
    answer:
      'On the sign-in screen click "Forgot password?" and enter your email address — we will send you a reset link.',
  },
  {
    question: 'Can I track interviews in a calendar?',
    answer: 'Yes. The Calendar view shows all scheduled interviews and today’s meetings with quick join links.',
  },
  {
    question: 'What is included in the free plan?',
    answer:
      'The Standard plan lets you track up to 10 applications with basic statistics. See the Pricing page for the full comparison with Pro.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'All data is encrypted in transit and at rest. We comply with GDPR and follow industry-standard security practices.',
  },
];

export default function FaqsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Help center</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Frequently asked questions about using Kariera.
      </p>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 px-5 py-4"
          >
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{faq.question}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
