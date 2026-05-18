import { AIRPORTS, haversineDistance, type LatLng } from "@/lib/toll-routes";

type AirportId = string;
type Direction = "pickup" | "dropoff";

interface WardPricing {
  id: string;
  name: string;
  aliases: string[];
  center: LatLng;
}

interface AirportPricingProfile {
  baseFareYen: number;
  referenceKm: number;
  perKmAfterReference: number;
  pickupSurchargeYen: number;
  dropoffSurchargeYen: number;
  pickupRangeYen: number;
  dropoffRangeYen: number;
  minimumPickupFareYen: number;
  minimumDropoffFareYen: number;
  fallbackTollYen: number;
}

export interface FareEstimate {
  low: number;
  high: number;
  wardName: string | null;
  referenceFareYen: number;
}

const DEFAULT_PRICING: AirportPricingProfile = {
  baseFareYen: 8000,
  referenceKm: 8,
  perKmAfterReference: 260,
  pickupSurchargeYen: 1000,
  dropoffSurchargeYen: 0,
  pickupRangeYen: 1500,
  dropoffRangeYen: 1200,
  minimumPickupFareYen: 9500,
  minimumDropoffFareYen: 8500,
  fallbackTollYen: 1000
};

const PRICING: Record<AirportId, AirportPricingProfile> = {
  haneda: {
    baseFareYen: 10500,
    referenceKm: 5,
    perKmAfterReference: 280,
    pickupSurchargeYen: 500,
    dropoffSurchargeYen: 0,
    pickupRangeYen: 2000,
    dropoffRangeYen: 1000,
    minimumPickupFareYen: 11500,
    minimumDropoffFareYen: 10500,
    fallbackTollYen: 1500
  },
  narita: {
    baseFareYen: 17500,
    referenceKm: 45,
    perKmAfterReference: 130,
    pickupSurchargeYen: 3500,
    dropoffSurchargeYen: 0,
    pickupRangeYen: 1500,
    dropoffRangeYen: 1500,
    minimumPickupFareYen: 21500,
    minimumDropoffFareYen: 18000,
    fallbackTollYen: 3000
  },
  kansai: {
    baseFareYen: 14000,
    referenceKm: 35,
    perKmAfterReference: 180,
    pickupSurchargeYen: 2000,
    dropoffSurchargeYen: 0,
    pickupRangeYen: 1500,
    dropoffRangeYen: 1500,
    minimumPickupFareYen: 17000,
    minimumDropoffFareYen: 14500,
    fallbackTollYen: 2500
  },
  itami: {
    baseFareYen: 9000,
    referenceKm: 10,
    perKmAfterReference: 250,
    pickupSurchargeYen: 1000,
    dropoffSurchargeYen: 0,
    pickupRangeYen: 1500,
    dropoffRangeYen: 1000,
    minimumPickupFareYen: 10500,
    minimumDropoffFareYen: 9000,
    fallbackTollYen: 1000
  },
  newChitose: {
    baseFareYen: 15000,
    referenceKm: 40,
    perKmAfterReference: 170,
    pickupSurchargeYen: 2500,
    dropoffSurchargeYen: 0,
    pickupRangeYen: 1800,
    dropoffRangeYen: 1500,
    minimumPickupFareYen: 18500,
    minimumDropoffFareYen: 15500,
    fallbackTollYen: 2000
  },
  okadama: {
    baseFareYen: 8500,
    referenceKm: 6,
    perKmAfterReference: 240,
    pickupSurchargeYen: 800,
    dropoffSurchargeYen: 0,
    pickupRangeYen: 1200,
    dropoffRangeYen: 1000,
    minimumPickupFareYen: 9800,
    minimumDropoffFareYen: 8500,
    fallbackTollYen: 800
  },
  fukuoka: {
    baseFareYen: 6500,
    referenceKm: 5,
    perKmAfterReference: 280,
    pickupSurchargeYen: 500,
    dropoffSurchargeYen: 0,
    pickupRangeYen: 1200,
    dropoffRangeYen: 1000,
    minimumPickupFareYen: 7500,
    minimumDropoffFareYen: 6500,
    fallbackTollYen: 700
  },
  naha: {
    baseFareYen: 7000,
    referenceKm: 5,
    perKmAfterReference: 260,
    pickupSurchargeYen: 500,
    dropoffSurchargeYen: 0,
    pickupRangeYen: 1200,
    dropoffRangeYen: 1000,
    minimumPickupFareYen: 8000,
    minimumDropoffFareYen: 7000,
    fallbackTollYen: 700
  }
};

const TOKYO_WARDS: WardPricing[] = [
  ward("adachi", "Adachi", ["Adachi City", "Adachi-ku", "足立区"], 35.775, 139.804),
  ward("arakawa", "Arakawa", ["Arakawa City", "Arakawa-ku", "荒川区"], 35.736, 139.783),
  ward("bunkyo", "Bunkyo", ["Bunkyo City", "Bunkyo-ku", "文京区"], 35.708, 139.752),
  ward("chiyoda", "Chiyoda", ["Chiyoda City", "Chiyoda-ku", "千代田区"], 35.694, 139.754),
  ward("chuo", "Chuo", ["Chuo City", "Chuo-ku", "中央区"], 35.671, 139.772),
  ward("edogawa", "Edogawa", ["Edogawa City", "Edogawa-ku", "江戸川区"], 35.706, 139.868),
  ward("itabashi", "Itabashi", ["Itabashi City", "Itabashi-ku", "板橋区"], 35.751, 139.709),
  ward("katsushika", "Katsushika", ["Katsushika City", "Katsushika-ku", "葛飾区"], 35.743, 139.847),
  ward("kita", "Kita", ["Kita City", "Kita-ku", "北区"], 35.752, 139.733),
  ward("koto", "Koto", ["Koto City", "Koto-ku", "江東区"], 35.672, 139.817),
  ward("meguro", "Meguro", ["Meguro City", "Meguro-ku", "目黒区"], 35.641, 139.699),
  ward("minato", "Minato", ["Minato City", "Minato-ku", "港区"], 35.658, 139.751),
  ward("nakano", "Nakano", ["Nakano City", "Nakano-ku", "中野区"], 35.707, 139.663),
  ward("nerima", "Nerima", ["Nerima City", "Nerima-ku", "練馬区"], 35.735, 139.652),
  ward("ota", "Ota", ["Ota City", "Ota-ku", "大田区"], 35.561, 139.716),
  ward("setagaya", "Setagaya", ["Setagaya City", "Setagaya-ku", "世田谷区"], 35.646, 139.653),
  ward("shibuya", "Shibuya", ["Shibuya City", "Shibuya-ku", "渋谷区", "涩谷区"], 35.664, 139.698),
  ward("shinagawa", "Shinagawa", ["Shinagawa City", "Shinagawa-ku", "品川区"], 35.609, 139.73),
  ward("shinjuku", "Shinjuku", ["Shinjuku City", "Shinjuku-ku", "新宿区", "Shin-Okubo", "Shin Okubo"], 35.693, 139.704),
  ward("suginami", "Suginami", ["Suginami City", "Suginami-ku", "杉並区", "杉并区"], 35.699, 139.636),
  ward("sumida", "Sumida", ["Sumida City", "Sumida-ku", "墨田区"], 35.71, 139.801),
  ward("taito", "Taito", ["Taito City", "Taito-ku", "台東区", "台东区"], 35.712, 139.78),
  ward("toshima", "Toshima", ["Toshima City", "Toshima-ku", "豊島区", "丰岛区"], 35.733, 139.715)
];

function ward(id: string, name: string, aliases: string[], lat: number, lng: number): WardPricing {
  return {
    id,
    name,
    aliases: [name, ...aliases],
    center: { lat, lng }
  };
}

function roundTo500(amount: number) {
  return Math.round(amount / 500) * 500;
}

function normalizeAddress(value: string) {
  return value.toLowerCase().replace(/[\s\-_,.]/g, "");
}

function findWardByAddress(addressText: string) {
  const normalized = normalizeAddress(addressText);
  return TOKYO_WARDS.find((wardItem) =>
    wardItem.aliases.some((alias) => normalized.includes(normalizeAddress(alias)))
  );
}

function findNearestWard(latlng: LatLng) {
  let nearest: { ward: WardPricing; distanceKm: number } | null = null;

  for (const wardItem of TOKYO_WARDS) {
    const distanceKm = haversineDistance(latlng, wardItem.center);
    if (!nearest || distanceKm < nearest.distanceKm) {
      nearest = { ward: wardItem, distanceKm };
    }
  }

  return nearest && nearest.distanceKm <= 8 ? nearest.ward : null;
}

function getAirportId(value: string): AirportId {
  return PRICING[value] ? value : "narita";
}

function getDirection(value: string): Direction {
  return value === "dropoff" ? "dropoff" : "pickup";
}

function calculateBaseFare(profile: AirportPricingProfile, distanceKm: number, direction: Direction) {
  const distanceFare =
    profile.baseFareYen + Math.max(0, distanceKm - profile.referenceKm) * profile.perKmAfterReference;
  const directionFare =
    distanceFare + (direction === "pickup" ? profile.pickupSurchargeYen : profile.dropoffSurchargeYen);
  const minimumFare = direction === "pickup" ? profile.minimumPickupFareYen : profile.minimumDropoffFareYen;

  return roundTo500(Math.max(minimumFare, directionFare));
}

export function calculateAirportFareEstimate({
  airportId,
  direction,
  destination,
  routeDistanceKm,
  tollYen,
  addressText = ""
}: {
  airportId: string;
  direction: Direction;
  destination: LatLng;
  routeDistanceKm: number;
  tollYen: number;
  addressText?: string;
}): FareEstimate {
  const selectedAirportId = getAirportId(airportId);
  const selectedDirection = getDirection(direction);
  const profile = PRICING[selectedAirportId] ?? DEFAULT_PRICING;
  const airport = AIRPORTS[selectedAirportId]?.latlng ?? destination;
  const useTokyoWardPricing = selectedAirportId === "narita" || selectedAirportId === "haneda";
  const wardItem = useTokyoWardPricing
    ? addressText
      ? findWardByAddress(addressText) ?? findNearestWard(destination)
      : findNearestWard(destination)
    : null;
  const referenceDistanceKm = wardItem ? haversineDistance(airport, wardItem.center) : routeDistanceKm;
  const baseFare = calculateBaseFare(profile, referenceDistanceKm, selectedDirection);
  const fallbackAddOn = wardItem ? 0 : tollYen || profile.fallbackTollYen;
  const low = roundTo500(baseFare + fallbackAddOn);

  return {
    low,
    high: roundTo500(low + (selectedDirection === "pickup" ? profile.pickupRangeYen : profile.dropoffRangeYen)),
    wardName: wardItem?.name ?? null,
    referenceFareYen: baseFare
  };
}
