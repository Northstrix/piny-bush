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

// AnalyticsRouteTracker as an inner component with client-only render guard
function AnalyticsRouteTrackerWrapper() {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  // Only render AnalyticsRouteTracker on client after mount
  return hasMounted ? <AnalyticsRouteTracker /> : null;
}

function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const { language } = useLanguage();

  React.useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || '', {
        page_path: pathname,
      });
      // Optional: you can also track language in event here, if desired
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
          {/* Client-only Analytics Route Tracker to avoid SSR errors */}
          <AnalyticsRouteTrackerWrapper />
          {children}
        </AppDirectionController>
      </AppStateController>
    </LanguageProvider>
  );
}
