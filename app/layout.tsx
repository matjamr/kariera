import { Metadata } from 'next';
import { Suspense } from 'react';

import { SITE } from '~/config.js';

import Providers from '~/components/atoms/Providers';
import { AuthProvider } from '~/components/app/AuthProvider';
import AnalyticsListener from '~/components/app/AnalyticsListener';

import { Inter as CustomFont } from 'next/font/google';
import '~/assets/styles/base.css';

const customFont = CustomFont({ subsets: ['latin'], variable: '--font-custom' });

export interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: `%s — ${SITE.name}`,
    default: SITE.title,
  },
  description: SITE.description,
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`motion-safe:scroll-smooth ${customFont.variable} font-sans`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="tracking-tight antialiased text-gray-900 dark:text-slate-300 dark:bg-slate-900">
        <Providers>
          <AuthProvider>
            <Suspense fallback={null}>
              <AnalyticsListener />
            </Suspense>
            <div id="app-shell">{children}</div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
