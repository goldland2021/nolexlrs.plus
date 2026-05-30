"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { calculateAirportFareEstimate } from "@/lib/airport-pricing";
import { trackAnalyticsEvent, trackWhatsAppLeadConversion } from "@/lib/analytics";
import type { CityAirport } from "@/lib/city-routes";
import { AIRPORTS, type LatLng, findNearestTollZone } from "@/lib/toll-routes";
import { geocodeAddressGoogleMaps, getDrivingRouteGoogleMaps } from "@/lib/google-maps-routing";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/** Keep this stable at module scope; a new array every render can reload Maps and break the map state. */
const GOOGLE_MAPS_LIBRARIES: ("geometry" | "marker")[] = ["geometry", "marker"];

declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

const mapOptions: google.maps.MapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  gestureHandling: "greedy",
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID
};

interface RouteResult {
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

interface RoutePickerInnerProps {
  locale: "en" | "ja" | "zh";
  onRouteCalculated: (result: RouteResult | null) => void;
  airports?: CityAirport[];
  cityName?: string;
  citySearchName?: string;
  defaultAirportId?: string;
}

const DEFAULT_AIRPORTS: CityAirport[] = [
  { id: "narita", ...AIRPORTS.narita },
  { id: "haneda", ...AIRPORTS.haneda }
];

const UI = {
  en: {
    pickup: "Airport to hotel",
    dropoff: "Hotel to airport",
    airport: "Airport",
    address: "Hotel, Airbnb, or address",
    hint: "Example: Shinjuku Washington Hotel",
    search: "Get estimate",
    distance: "Distance",
    time: "Drive time",
    total: "Estimated private transfer",
    included: "Usually includes",
    includedCommonItems: ["Private door-to-door ride"],
    pickupIncludedItems: ["Flight delay tracking", "90 min airport pickup waiting"],
    dropoffIncludedItems: ["30 min hotel pickup waiting"],
    note: "This is a planning estimate. The final fixed quote is confirmed by WhatsApp after vehicle size, luggage, and pickup time are checked.",
    drag: "Fine-tune the red marker if the pin is not exactly on your hotel.",
    empty: "Enter a hotel name or address to see a reference fare before you message us.",
    searching: "Searching...",
    notFound: "We could not find that place. Try adding Tokyo, the ward name, or the hotel postcode.",
    confirm: "Confirm on WhatsApp",
    mapLoading: "Loading map...",
    mapKeyMissing:
      "Google Maps is not configured. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local and restart the dev server.",
    mapLoadFailed:
      "Google Maps script could not load. If the browser console shows net::ERR_CONNECTION_TIMED_OUT for maps.googleapis.com, your network cannot reach Google (common with firewalls or regions where Google is blocked)—try another network or a system-wide VPN, then hard-refresh. If the request reaches Google but still fails, enable Maps JavaScript API, Geocoding API, Directions API, link billing, and fix HTTP referrer restrictions.",
    mapAuthFailed:
      "Google rejected this map key (common: Maps JavaScript API not enabled, billing not linked, or HTTP referrer restrictions do not match this URL). In Google Cloud Console, enable the APIs and add http://localhost:3000/* for local dev."
  },
  ja: {
    pickup: "空港からホテル",
    dropoff: "ホテルから空港",
    airport: "空港",
    address: "ホテル・民泊・住所",
    hint: "例: 新宿ワシントンホテル",
    search: "見積もり",
    distance: "距離",
    time: "所要時間",
    total: "プライベート送迎の目安",
    included: "通常含まれるもの",
    includedCommonItems: ["ドアツードア送迎"],
    pickupIncludedItems: ["フライト遅延確認", "空港お迎え90分無料待機"],
    dropoffIncludedItems: ["ホテルお迎え30分無料待機"],
    note: "車種、荷物、出発時刻を確認後、WhatsAppで最終固定料金をご案内します。",
    drag: "ピンの位置がずれている場合は、赤いマーカーを調整できます。",
    empty: "ホテル名または住所を入力すると、問い合わせ前に参考料金を確認できます。",
    searching: "検索中...",
    notFound: "場所が見つかりませんでした。都市名、区名、ホテルの郵便番号などを追加してください。",
    confirm: "WhatsAppで確認",
    mapLoading: "地図を読み込み中...",
    mapKeyMissing:
      "Google Maps is not configured. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local and restart the dev server.",
    mapLoadFailed:
      "Google マップのスクリプトを読み込めませんでした。コンソールに maps.googleapis.com への net::ERR_CONNECTION_TIMED_OUT がある場合は、ネットワークが Google に到達できていません（企業 FW や地域制限など）。別回線やシステム全体の VPN を試し、強制再読み込みしてください。接続できるのに失敗する場合は API 有効化・課金・HTTP リファラを確認してください。",
    mapAuthFailed:
      "Google マップのキーが拒否されました。Maps JavaScript API の有効化、課金アカウントの紐付け、HTTP リファラ（例: http://localhost:3000/*）をご確認ください。"
  },
  zh: {
    pickup: "機場到酒店",
    dropoff: "酒店到機場",
    airport: "機場",
    address: "酒店、民宿或地址",
    hint: "例如：新宿華盛頓酒店",
    search: "獲取預估",
    distance: "距離",
    time: "車程",
    total: "私人接送預估價",
    included: "通常包含",
    includedCommonItems: ["點對點專車接送"],
    pickupIncludedItems: ["航班延誤跟蹤", "機場接機90分鐘免費等待"],
    dropoffIncludedItems: ["酒店上車30分鐘免費等待"],
    note: "最終固定報價會在確認車型、行李和接送時間後透過 WhatsApp 確認。",
    drag: "如果紅色定位點不準確，可以拖動微調。",
    empty: "輸入酒店名或地址，就可以先查看參考價格。",
    searching: "搜尋中...",
    notFound: "沒有找到這個地點，請嘗試加入城市名、區域名或酒店郵遞區號。",
    confirm: "透過 WhatsApp 確認",
    mapLoading: "地圖載入中...",
    mapKeyMissing:
      "Google Maps is not configured. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local and restart the dev server.",
    mapLoadFailed:
      "無法載入 Google 地圖腳本。若主控台裡對 maps.googleapis.com 的請求出現 net::ERR_CONNECTION_TIMED_OUT，說明當前網路連不上 Google 伺服器（國內直連、公司防火牆或未覆蓋瀏覽器的代理都很常見），可嘗試更換網路、使用系統級代理/VPN 後強制重新整理。若能連通但仍報錯，再檢查是否啟用 Maps JavaScript API、Geocoding、Directions、已綁定結算，以及金鑰的 HTTP 引薦來源是否包含當前頁面地址。",
    mapAuthFailed:
      "Google 拒絕了當前地圖金鑰。常見原因：未啟用「Maps JavaScript API」、專案未綁定結算帳號、或金鑰的「HTTP 引薦來源網址」不包含當前頁面地址。本地開發請為該金鑰新增 http://localhost:3000/*（連接埠需一致），保存後等待約 1～5 分鐘再刷新。"
  }
};

function formatYen(amount: number) {
  return `JPY ${Math.round(amount).toLocaleString("en-US")}`;
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)} hr ${minutes % 60} min`;
}

function getIncludedItems(t: (typeof UI)["en"], direction: RouteResult["direction"]) {
  return [
    ...t.includedCommonItems,
    ...(direction === "pickup" ? t.pickupIncludedItems : t.dropoffIncludedItems)
  ];
}


export default function RoutePickerInner({
  locale,
  onRouteCalculated,
  airports = DEFAULT_AIRPORTS,
  cityName = "Tokyo",
  citySearchName = "Tokyo, Japan",
  defaultAirportId
}: RoutePickerInnerProps) {
  const t = UI[locale];
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const airportOptions = airports.length ? airports : DEFAULT_AIRPORTS;
  const initialAirportId =
    defaultAirportId && airportOptions.some((airport) => airport.id === defaultAirportId)
      ? defaultAirportId
      : airportOptions[0].id;

  const mapLanguage = useMemo(() => (locale === "zh" ? "zh-TW" : locale === "ja" ? "ja" : "en"), [locale]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "route-picker-google-maps",
    googleMapsApiKey: apiKey,
    version: "weekly",
    libraries: GOOGLE_MAPS_LIBRARIES,
    language: mapLanguage,
    region: "JP"
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const routePolylineRef = useRef<google.maps.Polyline | null>(null);
  const routeRequestIdRef = useRef(0);
  const airportMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const destMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [mapAuthFailed, setMapAuthFailed] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const prev = window.gm_authFailure;
    window.gm_authFailure = () => {
      setMapAuthFailed(true);
      prev?.();
    };
    return () => {
      window.gm_authFailure = prev;
    };
  }, []);

  const [direction, setDirection] = useState<"pickup" | "dropoff">("pickup");
  const [airportId, setAirportId] = useState<string>(initialAirportId);
  const [address, setAddress] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [destLatLng, setDestLatLng] = useState<LatLng | null>(null);
  const [routePath, setRoutePath] = useState<google.maps.LatLngLiteral[] | null>(null);
  const latestSelectionRef = useRef({ airportId, direction });

  const currentAirport = airportOptions.find((airport) => airport.id === airportId) ?? airportOptions[0];
  const airportPos = currentAirport.latlng;
  const airportName = currentAirport.name[locale] ?? currentAirport.name.en;
  const airportCenter = useMemo(
    () => ({ lat: airportPos.lat, lng: airportPos.lng }),
    [airportPos.lat, airportPos.lng]
  );

  useEffect(() => {
    latestSelectionRef.current = { airportId, direction };
  }, [airportId, direction]);

  const removeRoutePolyline = useCallback(() => {
    routePolylineRef.current?.setMap(null);
    routePolylineRef.current = null;
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!isLoaded || !map || destLatLng) return;

    const id = requestAnimationFrame(() => {
      map.panTo(airportCenter);
      map.setZoom(10);
    });
    return () => cancelAnimationFrame(id);
  }, [isLoaded, airportCenter, destLatLng]);

  const clearRenderedRoute = useCallback(() => {
    routeRequestIdRef.current += 1;
    removeRoutePolyline();
    setError("");
    setRouteResult(null);
    onRouteCalculated(null);
    setRoutePath(null);
  }, [onRouteCalculated, removeRoutePolyline]);

  useEffect(() => {
    const map = mapRef.current;
    removeRoutePolyline();

    if (!isLoaded || !map || !routePath || routePath.length === 0) return;

    const polyline = new google.maps.Polyline({
      path: routePath,
      strokeColor: "#c46b3b",
      strokeOpacity: 0.85,
      strokeWeight: 4,
      zIndex: 1
    });

    polyline.setMap(map);
    routePolylineRef.current = polyline;

    return () => {
      polyline.setMap(null);
      if (routePolylineRef.current === polyline) {
        routePolylineRef.current = null;
      }
    };
  }, [isLoaded, removeRoutePolyline, routePath]);

  const calculateAndRender = useCallback(
    async (
      dest: LatLng,
      selection: { airportId?: string; direction?: "pickup" | "dropoff"; addressText?: string } = {}
    ) => {
      if (!isLoaded) return;

      const requestId = ++routeRequestIdRef.current;
      const selectedAirportId = selection.airportId ?? latestSelectionRef.current.airportId;
      const selectedDirection = selection.direction ?? latestSelectionRef.current.direction;
      const selectedAirport = airportOptions.find((airport) => airport.id === selectedAirportId) ?? airportOptions[0];
      const selectedAirportPos = selectedAirport.latlng;

      setError("");
      setDestLatLng(dest);
      setRouteResult(null);
      onRouteCalculated(null);
      removeRoutePolyline();
      setRoutePath(null);

      const { tollYen } = findNearestTollZone(dest, selectedAirportId);
      const origin: google.maps.LatLngLiteral =
        selectedDirection === "pickup"
          ? { lat: selectedAirportPos.lat, lng: selectedAirportPos.lng }
          : { lat: dest.lat, lng: dest.lng };
      const destination: google.maps.LatLngLiteral =
        selectedDirection === "pickup"
          ? { lat: dest.lat, lng: dest.lng }
          : { lat: selectedAirportPos.lat, lng: selectedAirportPos.lng };

      const route = await getDrivingRouteGoogleMaps(origin, destination);

      if (requestId !== routeRequestIdRef.current) return;

      if (!route || route.path.length === 0) {
        setError(t.notFound);
        setRouteResult(null);
        onRouteCalculated(null);
        removeRoutePolyline();
        setRoutePath(null);
        return;
      }

      const fare = calculateAirportFareEstimate({
        airportId: selectedAirportId,
        direction: selectedDirection,
        destination: dest,
        routeDistanceKm: route.distanceKm,
        tollYen,
        addressText: selection.addressText ?? address
      });

      if (requestId !== routeRequestIdRef.current) return;

      setRoutePath(route.path);

      const map = mapRef.current;
      if (map) {
        const b = new google.maps.LatLngBounds();
        route.path.forEach((p) => b.extend(p));
        b.extend({ lat: selectedAirportPos.lat, lng: selectedAirportPos.lng });
        b.extend({ lat: dest.lat, lng: dest.lng });
        map.fitBounds(b, 60);
      }

      const result: RouteResult = {
        airportId: selectedAirportId,
        airportName: selectedAirport.name[locale] ?? selectedAirport.name.en,
        direction: selectedDirection,
        distanceKm: route.distanceKm,
        durationMin: route.durationMin,
        tollYen,
        destLat: dest.lat,
        destLng: dest.lng,
        destName: address.trim() || selection.addressText || "",
        estimateLowYen: fare.low,
        estimateHighYen: fare.high
      };

      if (requestId !== routeRequestIdRef.current) return;

      setRouteResult(result);
      onRouteCalculated(result);
    },
    [address, airportOptions, isLoaded, locale, onRouteCalculated, removeRoutePolyline, t]
  );

  // Keep a stable ref so dragend listeners don't capture stale closures
  const calculateAndRenderRef = useRef(calculateAndRender);
  useEffect(() => { calculateAndRenderRef.current = calculateAndRender; }, [calculateAndRender]);

  // Airport marker (blue pin) — update position when airport changes, create on first load
  useEffect(() => {
    if (!isLoaded || !mapReady || !mapRef.current) return;
    const pos = airportCenter;
    if (airportMarkerRef.current) {
      airportMarkerRef.current.position = pos;
      return;
    }
    const pin = new google.maps.marker.PinElement({ background: "#4285F4", borderColor: "#2563EB", glyphColor: "#fff" });
    airportMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
      map: mapRef.current,
      position: pos,
      title: airportName,
      content: pin.element
    });
  }, [isLoaded, mapReady, airportCenter, airportName]);

  // Destination marker (red pin, draggable) — create when destLatLng set, remove when null
  useEffect(() => {
    if (!isLoaded || !mapReady || !mapRef.current) return;
    if (!destLatLng) {
      if (destMarkerRef.current) { destMarkerRef.current.map = null; destMarkerRef.current = null; }
      return;
    }
    const pos = { lat: destLatLng.lat, lng: destLatLng.lng };
    if (destMarkerRef.current) { destMarkerRef.current.position = pos; return; }
    const pin = new google.maps.marker.PinElement({ background: "#EA4335", borderColor: "#C5221F", glyphColor: "#fff" });
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: mapRef.current,
      position: pos,
      gmpDraggable: true,
      content: pin.element
    });
    marker.addListener("dragend", () => {
      const p = marker.position;
      if (!p) return;
      const lat = p instanceof google.maps.LatLng ? p.lat() : (p as google.maps.LatLngLiteral).lat;
      const lng = p instanceof google.maps.LatLng ? p.lng() : (p as google.maps.LatLngLiteral).lng;
      calculateAndRenderRef.current({ lat, lng });
    });
    destMarkerRef.current = marker;
  }, [isLoaded, mapReady, destLatLng]);

  // Cleanup both markers on unmount
  useEffect(() => () => {
    if (airportMarkerRef.current) { airportMarkerRef.current.map = null; airportMarkerRef.current = null; }
    if (destMarkerRef.current) { destMarkerRef.current.map = null; destMarkerRef.current = null; }
  }, []);

  const handleDirectionChange = (nextDirection: "pickup" | "dropoff") => {
    if (nextDirection === direction) return;
    latestSelectionRef.current = { airportId, direction: nextDirection };
    setDirection(nextDirection);
    clearRenderedRoute();

    if (destLatLng && isLoaded) {
      void calculateAndRender(destLatLng, { direction: nextDirection });
    }
  };

  const handleAirportChange = (nextAirportId: string) => {
    if (nextAirportId === airportId) return;
    latestSelectionRef.current = { airportId: nextAirportId, direction };
    setAirportId(nextAirportId);
    clearRenderedRoute();

    if (destLatLng && isLoaded) {
      void calculateAndRender(destLatLng, { airportId: nextAirportId });
    }
  };

  const handleSearch = async () => {
    if (!address.trim() || !isLoaded) return;

    setSearching(true);
    setError("");
    const query = /japan|日本|tokyo|osaka|sapporo|hokkaido|fukuoka|naha|okinawa|chiba|kanagawa/i.test(address)
      ? address
      : `${address}, ${citySearchName}`;
    const geo = await geocodeAddressGoogleMaps(query);

    if (geo) {
      await calculateAndRender(geo, { addressText: geo.formattedAddress });
    } else {
      setError(t.notFound);
      setRouteResult(null);
      onRouteCalculated(null);
      setRoutePath(null);
    }

    setSearching(false);
  };

  const whatsAppHref = useMemo(() => {
    if (!routeResult) return "";

    const routeLabel =
      direction === "pickup"
        ? `${airportName} to ${address || "my hotel"}`
        : `${address || "my hotel"} to ${airportName}`;

    return buildWhatsAppLink(
      [
        `Hello, I would like to confirm a ${cityName} airport transfer quote.`,
        "",
        `Route: ${routeLabel}`,
        `Estimated fare shown: ${formatYen(routeResult.estimateLowYen)} - ${formatYen(routeResult.estimateHighYen)}`,
        `Distance: ${routeResult.distanceKm} km`,
        `Estimated drive time: ${formatDuration(routeResult.durationMin)}`,
        "",
        "Passenger count:",
        "Luggage:",
        "Flight number:",
        "Pickup date and time:"
      ].join("\n")
    );
  }, [address, airportName, cityName, direction, routeResult]);

  const mapBlock = (() => {
    if (!apiKey) {
      return (
        <div className="flex h-[320px] items-center justify-center rounded-lg border border-ember/30 bg-ember/5 px-4 text-center text-sm text-ink/70">
          {t.mapKeyMissing}
        </div>
      );
    }
    if (loadError) {
      const msg = loadError instanceof Error ? loadError.message : String(loadError);
      return (
        <div className="flex h-[320px] flex-col items-center justify-center gap-2 rounded-lg border border-ember/30 bg-ember/5 px-4 text-center text-sm text-ink/70">
          <p>{t.mapLoadFailed}</p>
          {msg ? <p className="max-w-md font-mono text-xs text-ink/50">{msg}</p> : null}
        </div>
      );
    }
    if (mapAuthFailed) {
      return (
        <div className="flex h-[320px] items-center justify-center rounded-lg border border-ember/30 bg-ember/5 px-4 text-center text-sm leading-6 text-ink/70">
          {t.mapAuthFailed}
        </div>
      );
    }
    if (!isLoaded) {
      return (
        <div className="flex h-[320px] items-center justify-center rounded-lg border border-clay/60 bg-sand/30">
          <p className="text-sm text-ink/50">{t.mapLoading}</p>
        </div>
      );
    }
    return (
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "320px" }}
        center={airportCenter}
        zoom={10}
        options={mapOptions}
        onLoad={(map) => {
          mapRef.current = map;
          setMapReady(true);
        }}
        onUnmount={() => {
          removeRoutePolyline();
          mapRef.current = null;
          setMapReady(false);
        }}
      />
    );
  })();

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleDirectionChange("pickup")}
          className={`h-11 rounded-lg px-4 text-sm font-semibold transition ${
            direction === "pickup"
              ? "bg-ink text-white shadow-lift"
              : "border border-clay/60 bg-white text-ink/70 hover:bg-sand"
          }`}
        >
          {t.pickup}
        </button>
        <button
          type="button"
          onClick={() => handleDirectionChange("dropoff")}
          className={`h-11 rounded-lg px-4 text-sm font-semibold transition ${
            direction === "dropoff"
              ? "bg-ink text-white shadow-lift"
              : "border border-clay/60 bg-white text-ink/70 hover:bg-sand"
          }`}
        >
          {t.dropoff}
        </button>
      </div>

      <div className="grid gap-3 lg:grid-cols-[0.82fr_1.18fr]">
        <label className="grid gap-2 text-sm font-medium text-ink">
          {t.airport}
          <select
            value={airportId}
            onChange={(event) => handleAirportChange(event.target.value)}
            className="h-12 w-full rounded-lg border border-clay/60 bg-white px-4 text-base font-normal focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30"
          >
            {airportOptions.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name[locale] ?? airport.name.en}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-ink">
          {t.address}
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
              placeholder={t.hint}
              className="h-12 min-w-0 rounded-lg border border-clay/60 px-4 text-base font-normal focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30"
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={searching || !address.trim() || !isLoaded || !apiKey}
              className="h-12 rounded-lg bg-ember px-5 text-sm font-semibold text-white transition hover:bg-ember/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {searching ? t.searching : t.search}
            </button>
          </div>
        </label>
      </div>

      {error && (
        <div className="rounded-lg border border-ember/30 bg-ember/5 px-4 py-3 text-sm text-ink/70">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-clay/60 bg-sand/30">{mapBlock}</div>

      {routeResult ? (
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-lg border border-ember/20 bg-ember/5 p-5">
            <p className="text-sm font-semibold text-ember">{t.total}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-ink">
              {formatYen(routeResult.estimateLowYen)} - {formatYen(routeResult.estimateHighYen)}
            </p>
            <p className="mt-3 text-sm leading-6 text-ink/65">{t.note}</p>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg bg-ink px-4 text-sm font-semibold text-white transition hover:bg-ink/90"
              onClick={() => {
                const eventParams = {
                  route_airport: routeResult.airportId,
                  route_direction: routeResult.direction,
                  estimate_low_yen: routeResult.estimateLowYen,
                  estimate_high_yen: routeResult.estimateHighYen
                };

                trackAnalyticsEvent("route_quote_confirm", eventParams);
                trackWhatsAppLeadConversion("route_quote_confirm", eventParams);
              }}
            >
              {t.confirm}
            </a>
          </div>

          <div className="rounded-lg border border-clay/60 bg-white p-5 shadow-soft">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-xs font-medium text-ink/50">{t.distance}</p>
                <p className="mt-1 text-lg font-semibold text-ink">{routeResult.distanceKm} km</p>
              </div>
              <div>
                <p className="text-xs font-medium text-ink/50">{t.time}</p>
                <p className="mt-1 text-lg font-semibold text-ink">{formatDuration(routeResult.durationMin)}</p>
              </div>
            </div>

            <div className="mt-5 border-t border-clay/50 pt-4">
              <p className="text-sm font-semibold text-ink">{t.included}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {getIncludedItems(t, routeResult.direction).map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-ink/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-clay/60 bg-white px-4 py-5 text-center text-sm text-ink/55">
          {t.empty}
        </div>
      )}

      <p className="text-xs leading-5 text-ink/50">{t.drag}</p>
    </div>
  );
}
