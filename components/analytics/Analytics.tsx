import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId = 'GA_MEASUREMENT_ID' }: GoogleAnalyticsProps) {
  if (!measurementId || measurementId === 'GA_MEASUREMENT_ID') {
    return null; // Ne pas charger en développement
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
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

export function Clarity({ projectId = 'CLARITY_PROJECT_ID' }: ClarityProps) {
  if (!projectId || projectId === 'CLARITY_PROJECT_ID') {
    return null; // Ne pas charger en développement
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  );
}

interface HotjarProps {
  hjid?: number;
}

export function Hotjar({ hjid }: HotjarProps) {
  if (!hjid) {
    return null; // Ne pas charger en développement
  }

  return (
    <Script id="hotjar" strategy="afterInteractive">
      {`
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${hjid},hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}
    </Script>
  );
}
