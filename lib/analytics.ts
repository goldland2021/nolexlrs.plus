export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
};

export function trackAnalyticsEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  (window as AnalyticsWindow).gtag?.("event", eventName, params);
}

export function trackWhatsAppLeadConversion(location: string, params: AnalyticsParams = {}) {
  trackAnalyticsEvent("whatsapp_click", { location, ...params });
}
