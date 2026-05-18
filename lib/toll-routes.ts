/**
 * 日本高速費映射規則
 * 根據起點/終點區域估算高速費用
 * 資料來源: NEXCO東日本 / 首都高速 官網費率
 */

export interface LatLng {
  lat: number;
  lng: number;
}

// 機場座標
export const AIRPORTS: Record<string, { name: Record<string, string>; latlng: LatLng }> = {
  narita: {
    name: { en: "Narita Airport (NRT)", ja: "成田空港 (NRT)", zh: "成田機場 (NRT)" },
    latlng: { lat: 35.7647, lng: 140.3864 }
  },
  haneda: {
    name: { en: "Haneda Airport (HND)", ja: "羽田空港 (HND)", zh: "羽田機場 (HND)" },
    latlng: { lat: 35.5494, lng: 139.7798 }
  },
  kansai: {
    name: { en: "Kansai International Airport (KIX)", ja: "関西國際空港 (KIX)", zh: "關西國際機場 (KIX)" },
    latlng: { lat: 34.4347, lng: 135.2441 }
  },
  itami: {
    name: { en: "Osaka Itami Airport (ITM)", ja: "大阪伊丹空港 (ITM)", zh: "大阪伊丹機場 (ITM)" },
    latlng: { lat: 34.7855, lng: 135.4382 }
  },
  newChitose: {
    name: { en: "New Chitose Airport (CTS)", ja: "新千歳空港 (CTS)", zh: "新千歲機場 (CTS)" },
    latlng: { lat: 42.7752, lng: 141.6923 }
  },
  okadama: {
    name: { en: "Sapporo Okadama Airport (OKD)", ja: "札幌丘珠空港 (OKD)", zh: "札幌丘珠機場 (OKD)" },
    latlng: { lat: 43.1161, lng: 141.38 }
  },
  fukuoka: {
    name: { en: "Fukuoka Airport (FUK)", ja: "福岡空港 (FUK)", zh: "福岡機場 (FUK)" },
    latlng: { lat: 33.5859, lng: 130.4506 }
  },
  naha: {
    name: { en: "Naha Airport (OKA)", ja: "那覇空港 (OKA)", zh: "那霸機場 (OKA)" },
    latlng: { lat: 26.1958, lng: 127.6459 }
  }
};

// 東京主要區域座標和高速費映射
interface TollZone {
  label: Record<string, string>;
  latlng: LatLng;
  /** 從成田到該區域的高速費（円） */
  tollFromNarita: number;
  /** 從羽田到該區域的高速費（円） */
  tollFromHaneda: number;
  /** 影響半徑（公里），用於匹配用戶地址 */
  radiusKm: number;
}

export const TOLL_ZONES: TollZone[] = [
  {
    label: { en: "Shinjuku", ja: "新宿", zh: "新宿" },
    latlng: { lat: 35.6896, lng: 139.7006 },
    tollFromNarita: 3100,
    tollFromHaneda: 1500,
    radiusKm: 3
  },
  {
    label: { en: "Shibuya", ja: "渋谷", zh: "澀谷" },
    latlng: { lat: 35.6580, lng: 139.7016 },
    tollFromNarita: 3100,
    tollFromHaneda: 1500,
    radiusKm: 3
  },
  {
    label: { en: "Ginza / Chuo", ja: "銀座・中央區", zh: "銀座/中央區" },
    latlng: { lat: 35.6717, lng: 139.7652 },
    tollFromNarita: 2800,
    tollFromHaneda: 1300,
    radiusKm: 3
  },
  {
    label: { en: "Tokyo Station / Marunouchi", ja: "東京駅・丸の內", zh: "東京站/丸之內" },
    latlng: { lat: 35.6812, lng: 139.7671 },
    tollFromNarita: 2800,
    tollFromHaneda: 1300,
    radiusKm: 2
  },
  {
    label: { en: "Roppongi / Minato", ja: "六本木・港區", zh: "六本木/港區" },
    latlng: { lat: 35.6605, lng: 139.7292 },
    tollFromNarita: 3000,
    tollFromHaneda: 1400,
    radiusKm: 3
  },
  {
    label: { en: "Asakusa / Taito", ja: "淺草・臺東區", zh: "淺草/臺東區" },
    latlng: { lat: 35.7148, lng: 139.7967 },
    tollFromNarita: 2700,
    tollFromHaneda: 1400,
    radiusKm: 3
  },
  {
    label: { en: "Ueno", ja: "上野", zh: "上野" },
    latlng: { lat: 35.7142, lng: 139.7737 },
    tollFromNarita: 2700,
    tollFromHaneda: 1400,
    radiusKm: 2
  },
  {
    label: { en: "Ikebukuro", ja: "池袋", zh: "池袋" },
    latlng: { lat: 35.7292, lng: 139.7100 },
    tollFromNarita: 3100,
    tollFromHaneda: 1600,
    radiusKm: 3
  },
  {
    label: { en: "Shinagawa", ja: "品川", zh: "品川" },
    latlng: { lat: 35.6090, lng: 139.7300 },
    tollFromNarita: 2800,
    tollFromHaneda: 1000,
    radiusKm: 3
  },
  {
    label: { en: "Odaiba / Ariake", ja: "お臺場・有明", zh: "臺場/有明" },
    latlng: { lat: 35.6313, lng: 139.7756 },
    tollFromNarita: 3000,
    tollFromHaneda: 1200,
    radiusKm: 3
  },
  {
    label: { en: "Yokohama", ja: "橫浜", zh: "橫濱" },
    latlng: { lat: 35.4437, lng: 139.6380 },
    tollFromNarita: 4500,
    tollFromHaneda: 1800,
    radiusKm: 5
  },
  {
    label: { en: "Chiba City", ja: "千葉市", zh: "千葉市" },
    latlng: { lat: 35.6073, lng: 140.1063 },
    tollFromNarita: 2000,
    tollFromHaneda: 2500,
    radiusKm: 5
  }
];

/**
 * 根據座標找到最近的高速費區域
 */
export function findNearestTollZone(latlng: LatLng, fromAirport: string): {
  zone: TollZone | null;
  tollYen: number;
  zoneName: string;
} {
  let nearest: TollZone | null = null;
  let minDist = Infinity;

  for (const zone of TOLL_ZONES) {
    const dist = haversineDistance(latlng, zone.latlng);
    if (dist < zone.radiusKm && dist < minDist) {
      nearest = zone;
      minDist = dist;
    }
  }

  if (!nearest) {
    return { zone: null, tollYen: 0, zoneName: "" };
  }

  const tollYen = fromAirport === "narita" ? nearest.tollFromNarita : nearest.tollFromHaneda;
  return { zone: nearest, tollYen, zoneName: nearest.label.en };
}

/**
 * Haversine 距離公式（公里）
 */
export function haversineDistance(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const a2 = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a2), Math.sqrt(1 - a2));
}
