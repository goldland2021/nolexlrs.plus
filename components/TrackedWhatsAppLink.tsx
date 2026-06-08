"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackWhatsAppLeadConversion, type AnalyticsParams } from "@/lib/analytics";

type TrackedWhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  conversionLocation: string;
  conversionParams?: AnalyticsParams;
};

export default function TrackedWhatsAppLink({
  conversionLocation,
  conversionParams = {},
  onClick,
  ...props
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackWhatsAppLeadConversion(conversionLocation, conversionParams);
        onClick?.(event);
      }}
    />
  );
}
