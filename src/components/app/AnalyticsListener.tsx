'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ReactGA from 'react-ga4';
import Hotjar from '@hotjar/browser';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const HOTJAR_SITE_ID = Number(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID);
const HOTJAR_VERSION = 6;
// Hotjar is part of Contentsquare now — new accounts get a Contentsquare tag
// instead of a classic Hotjar Site ID. Either variable enables behaviour analytics.
const CONTENTSQUARE_TAG_ID = process.env.NEXT_PUBLIC_CONTENTSQUARE_TAG_ID;

let initialized = false;

export default function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (initialized) return;
    initialized = true;
    if (GA_MEASUREMENT_ID) {
      ReactGA.initialize(GA_MEASUREMENT_ID);
    }
    if (HOTJAR_SITE_ID) {
      Hotjar.init(HOTJAR_SITE_ID, HOTJAR_VERSION);
    }
    if (CONTENTSQUARE_TAG_ID) {
      const script = document.createElement('script');
      script.src = `https://t.contentsquare.net/uxa/${CONTENTSQUARE_TAG_ID}.js`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // SPA route changes don't reload the page, so report each navigation as a pageview.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const query = searchParams.toString();
    ReactGA.send({ hitType: 'pageview', page: query ? `${pathname}?${query}` : pathname });
  }, [pathname, searchParams]);

  return null;
}
