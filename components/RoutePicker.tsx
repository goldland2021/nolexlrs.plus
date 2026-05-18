"use client";

import dynamic from "next/dynamic";
import type { CityAirport } from "@/lib/city-routes";

const RoutePickerInner = dynamic(() => import("./RoutePickerInner"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[300px] rounded-xl border border-clay/60 bg-sand/30">
      <p className="text-sm text-ink/50">Loading map...</p>
    </div>
  )
});

export interface RouteQuote {
  airportId: string;
  airportName: string;
  direction: "pickup" | "dropoff";
  distanceKm: number;
  durationMin: number;
  tollYen: number;
  destLat: number;
  destLng: number;
  destName: string;
  estimateLowYen: number;
  estimateHighYen: number;
}

interface RoutePickerProps {
  locale: "en" | "ja" | "zh";
  onRouteCalculated: (result: RouteQuote | null) => void;
  airports?: CityAirport[];
  cityName?: string;
  citySearchName?: string;
  defaultAirportId?: string;
}

export default function RoutePicker(props: RoutePickerProps) {
  return <RoutePickerInner {...props} />;
}
