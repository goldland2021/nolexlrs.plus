export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
export const googleAdsMeasurementId =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_MEASUREMENT_ID || "AW-18222499357";
// "提交潜在客户表单" conversion action. Fired on the click, before the visitor
// leaves for WhatsApp, per Google's guidance for lead form conversions.
export const googleAdsLeadConversionId =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION_ID ||
  "AW-18222499357/3I3iCMq-6LocEJ2MlfFD";
export const primaryGoogleTagId = googleAdsMeasurementId || gaMeasurementId;
export const googleTagIds = Array.from(
  new Set([gaMeasurementId, googleAdsMeasurementId].filter(Boolean))
);

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
};

export function trackAnalyticsEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  (window as AnalyticsWindow).gtag?.("event", eventName, params);
}

export function trackGoogleAdsLeadConversion() {
  if (!googleAdsLeadConversionId) return;

  trackAnalyticsEvent("conversion", {
    send_to: googleAdsLeadConversionId,
    value: 1.0,
    currency: "JPY"
  });
}

export function trackWhatsAppLeadConversion(location: string, params: AnalyticsParams = {}) {
  trackAnalyticsEvent("whatsapp_click", { location, ...params });
  trackGoogleAdsLeadConversion();
}
