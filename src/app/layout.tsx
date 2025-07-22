"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { LanguageProvider } from "@/context/language-context";
import { useLanguage } from "@/hooks/use-language";
import { SplashedPushNotifications, SplashedPushNotificationsHandle } from "@/components/ui/splashed-push-notifications";
import { usePathname } from "next/navigation";

const AppStateContext = createContext<{
  appState: "loading" | "loaded";
  setAppState: React.Dispatch<React.SetStateAction<"loading" | "loaded">>;
  toastRef: React.RefObject<SplashedPushNotificationsHandle>;
}>({
  appState: "loading",
  setAppState: () => {},
  toastRef: React.createRef(),
});

export const useAppState = () => useContext(AppStateContext);

function AppStateController({ children }: { children: React.ReactNode }) {
  const [appState, setAppState] = useState<"loading" | "loaded">("loading");
  const toastRef = useRef<SplashedPushNotificationsHandle>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState("loaded");
      document.body.classList.add("loaded");
      // Send page_view only if window.gtag exists
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "page_view", {
          language,
          page_path: window.location.pathname,
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [language]);

  return (
    <AppStateContext.Provider value={{ appState, setAppState, toastRef }}>
      {appState === "loaded" ? children : null}
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
      const componentEditor = document.querySelector("[data-testid='component-editor']");
      if (componentEditor) {
        const reloadButton = componentEditor.querySelector(
          'button[aria-label="Reload Preview"]'
        ) as HTMLButtonElement;
        reloadButton?.click();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (
      mounted &&
      typeof window !== "undefined" &&
      typeof (window as any).gtag === "function"
    ) {
      (window as any).gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "", {
        page_path: pathname,
      });
    }
  }, [mounted, pathname, language]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AppStateController>
        <AppDirectionController>
          {/* Only run AnalyticsRouteTracker on client after mount */}
          <AnalyticsRouteTracker />
          {children}
        </AppDirectionController>
      </AppStateController>
    </LanguageProvider>
  );
}
