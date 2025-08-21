import Script from 'next/script';
import { IS_PRODUCTION } from '@/lib/env-config';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  if (!gaId || !IS_PRODUCTION) {
    return null; // Ne pas charger en développement
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
            anonymize_ip: true,
            allow_ad_personalization_signals: false,
            custom_map: {'custom_parameter': 'service_type'}
          });
        `}
      </Script>
    </>
  );
}

interface ClarityProps {
  projectId?: string;
}

export function Clarity({ projectId }: ClarityProps) {
  const clarityId = projectId || process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  
  if (!clarityId || !IS_PRODUCTION) {
    return null; // Ne pas charger en développement
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");
      `}
    </Script>
  );
}

interface HotjarProps {
  siteId?: string;
}

export function Hotjar({ siteId }: HotjarProps) {
  const hotjarId = siteId || process.env.NEXT_PUBLIC_HOTJAR_ID;
  
  if (!hotjarId || !IS_PRODUCTION) {
    return null; // Ne pas charger en développement
  }

  return (
    <Script id="hotjar" strategy="afterInteractive">
      {`
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${hotjarId},hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}
    </Script>
  );
}
