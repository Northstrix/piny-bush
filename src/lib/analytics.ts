// In a real app, this would be configured more robustly.
// We assume Google Analytics gtag script is loaded in the document head.

type EventName = 
  | 'page_view'
  | 'language_change'
  | 'select_component'
  | 'export_code'
  | 'export_config'
  | 'import_config'
  | 'footer_link_click';

interface EventParams {
  [key: string]: string | number | undefined;
}

declare global {
  interface Window {
    gtag?: (type: 'event', eventName: string, eventParams: EventParams) => void;
  }
}

export const trackEvent = (eventName: EventName, params: EventParams) => {
  if (process.env.NODE_ENV === 'production' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    console.log(`[Analytics Event] Name: ${eventName}, Params:`, params);
  }
};
