export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-V7EXSKJDYL";
export const leadFormConversionEventName = "conversion_event_submit_lead_form";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
};

export function trackAnalyticsEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  (window as AnalyticsWindow).gtag?.("event", eventName, params);
}

export function trackLeadFormConversion(params: AnalyticsParams = {}) {
  trackAnalyticsEvent(leadFormConversionEventName, params);
}

export function trackWhatsAppLeadConversion(location: string, params: AnalyticsParams = {}) {
  const eventParams = { location, ...params };

  trackAnalyticsEvent("whatsapp_click", eventParams);
  trackLeadFormConversion(eventParams);
}
