'use client';

import { IconCheck, IconCircleCheck, IconBan } from '@tabler/icons-react';

const TRUSTED = ['ACME Corp', 'Globex', 'Soylent', 'Initech', 'Umbrella Corp'];

const FAQS = [
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Yes, you can upgrade from Standard to Pro at any time. Your billing will be adjusted automatically on a pro-rata basis.',
  },
  {
    question: 'What counts as an "App"?',
    answer:
      'An app refers to any single active job application process or position listing you are currently tracking within your dashboard.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'All data is encrypted in transit and at rest. We comply with GDPR and follow industry-standard security practices.',
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Plans that scale with your ambition</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Whether you&apos;re just starting your recruitment journey or managing a global enterprise, Kariera provides
          the tools to build your dream team.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Standard */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 flex flex-col">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Free tier</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Standard</h2>
          <p className="mt-3 mb-1">
            <span className="text-4xl font-bold text-slate-900 dark:text-white">$0</span>
            <span className="text-slate-500 dark:text-slate-400 text-sm">/month</span>
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Perfect for individuals and small startups managing a focused hiring pipeline.
          </p>

          <ul className="space-y-3 mb-8 text-sm">
            {['Up to 10 apps', 'Basic stats & reporting', 'Standard job board visibility'].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <IconCircleCheck size={18} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                {feature}
              </li>
            ))}
            <li className="flex items-center gap-2 text-slate-400 line-through">
              <IconBan size={18} className="shrink-0" />
              Advanced analytics
            </li>
          </ul>

          <button className="mt-auto w-full py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            Choose Plan
          </button>
        </div>

        {/* Pro */}
        <div className="relative bg-white dark:bg-slate-800 rounded-xl border-2 border-indigo-600 p-8 flex flex-col overflow-hidden">
          <span className="absolute top-5 -right-9 rotate-45 bg-indigo-600 text-white text-[10px] font-bold tracking-wider px-10 py-1">
            Most Popular
          </span>
          <p className="text-[10px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-2">
            Professional
          </p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pro</h2>
          <p className="mt-3 mb-1">
            <span className="text-4xl font-bold text-slate-900 dark:text-white">$49</span>
            <span className="text-slate-500 dark:text-slate-400 text-sm">/month</span>
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Comprehensive tools for growing companies and high-volume recruitment teams.
          </p>

          <ul className="space-y-3 mb-8 text-sm">
            {[
              'Unlimited apps',
              'Advanced analytics suite',
              'CV cloud storage',
              'Company reviews & insights',
              'Priority support 24/7',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <IconCircleCheck size={18} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <button className="mt-auto w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors">
            Choose Plan
          </button>
        </div>
      </div>

      {/* Trusted by */}
      <div className="text-center space-y-4 py-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Trusted by global hiring teams</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Join over 10,000 companies using Kariera Pro to streamline their hiring workflow.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {TRUSTED.map((company) => (
            <span
              key={company}
              className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-400"
            >
              {company}
            </span>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 px-5 py-4"
            >
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white mb-1">
                <IconCheck size={16} className="text-indigo-600 dark:text-indigo-400" />
                {faq.question}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
