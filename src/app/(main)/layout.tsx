'use client';

import Script from 'next/script';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || '';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Google Analytics 4 Scripts: Loaded only, no tracking here */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Site Layout */}
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />
        <main className="flex-1 pt-8">{children}</main>
        <Footer />
      </div>
    </>
  );
}
