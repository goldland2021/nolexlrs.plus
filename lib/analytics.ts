export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
export const googleAdsMeasurementId =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_MEASUREMENT_ID || "AW-18222499357";
export const googleAdsWhatsAppConversionId =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION_ID || googleAdsMeasurementId;
export const leadFormConversionEventName = "conversion_event_submit_lead_form";
export const primaryGoogleTagId = googleAdsMeasurementId || gaMeasurementId;
export const googleTagIds = Array.from(new Set([gaMeasurementId, googleAdsMeasurementId].filter(Boolean)));

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

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

export function trackGoogleAdsWhatsAppConversion(params: AnalyticsParams = {}) {
  if (!googleAdsWhatsAppConversionId) return;

  trackAnalyticsEvent("conversion", {
    ...params,
    send_to: googleAdsWhatsAppConversionId
  });
}

export function trackWhatsAppLeadConversion(location: string, params: AnalyticsParams = {}) {
  const eventParams = { location, ...params };

  trackAnalyticsEvent("whatsapp_click", eventParams);
  trackLeadFormConversion(eventParams);
  trackGoogleAdsWhatsAppConversion(eventParams);
}
