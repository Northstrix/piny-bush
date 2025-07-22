"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { LanguageProvider } from "@/context/language-context";
import { useLanguage } from "@/hooks/use-language";
import { SplashedPushNotifications, SplashedPushNotificationsHandle } from "@/components/ui/splashed-push-notifications";
import { usePathname } from "next/navigation";

const AppStateContext = createContext<{
  appState: 'loading' | 'loaded';
  setAppState: React.Dispatch<React.SetStateAction<'loading' | 'loaded'>>;
  toastRef: React.RefObject<SplashedPushNotificationsHandle>;
}>({
  appState: 'loading',
  setAppState: () => {},
  toastRef: React.createRef(),
});

export const useAppState = () => useContext(AppStateContext);

// Utility: send event to Google Analytics via gtag if loaded
function sendGtagEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

function AppStateController({ children }: { children: React.ReactNode }) {
  const [appState, setAppState] = useState<'loading' | 'loaded'>('loading');
  const toastRef = useRef<SplashedPushNotificationsHandle>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState('loaded');
      document.body.classList.add('loaded');

      // Send initial page_view event with language param
      sendGtagEvent('page_view', { language, page_path: window.location.pathname });
    }, 1000);

    return () => clearTimeout(timer);
  }, [language]);

  return (
    <AppStateContext.Provider value={{ appState, setAppState, toastRef }}>
      {/* Only render children after loading */}
      {appState === 'loaded' ? children : null}
      <SplashedPushNotifications
        ref={toastRef}
        timerColor="rgba(255,255,255,0.8)"
        timerBgColor="rgba(255,255,255,0.3)"
      />
    </AppStateContext.Provider>
  );
}

function AppDirectionController({ children }: { children: React.ReactNode }) {
  const { direction } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const componentEditor = document.querySelector('[data-testid="component-editor"]');
      if (componentEditor) {
        const reloadButton = componentEditor.querySelector('button[aria-label="Reload Preview"]') as HTMLButtonElement;
        reloadButton?.click();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div dir={direction} className="min-h-screen flex flex-col">
      {children}
    </div>
  );
}

// --- New component to detect route changes and send GA page_view ---
function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const { language } = useLanguage();

  useEffect(() => {
    // On every path change, send page_view with path and language info
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || '', {
        page_path: pathname,
      });
      // Optionally, you can log as event instead of config to track language
      // window.gtag('event', 'page_view', { page_path: pathname, language });
    }
  }, [pathname, language]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AppStateController>
        <AppDirectionController>
          {/* Track SPA route changes for GA */}
          <AnalyticsRouteTracker />
          {children}
        </AppDirectionController>
      </AppStateController>
    </LanguageProvider>
  );
}
