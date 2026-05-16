/**
 * 日本高速费映射规则
 * 根据起点/终点区域估算高速费用
 * 数据来源: NEXCO东日本 / 首都高速 官网费率
 */

export interface LatLng {
  lat: number;
  lng: number;
}

// 机场坐标
export const AIRPORTS: Record<string, { name: Record<string, string>; latlng: LatLng }> = {
  narita: {
    name: { en: "Narita Airport (NRT)", ja: "成田空港 (NRT)", zh: "成田机场 (NRT)" },
    latlng: { lat: 35.7647, lng: 140.3864 }
  },
  haneda: {
    name: { en: "Haneda Airport (HND)", ja: "羽田空港 (HND)", zh: "羽田机场 (HND)" },
    latlng: { lat: 35.5494, lng: 139.7798 }
  }
};

// 东京主要区域坐标和高速费映射
interface TollZone {
  label: Record<string, string>;
  latlng: LatLng;
  /** 从成田到该区域的高速费（円） */
  tollFromNarita: number;
  /** 从羽田到该区域的高速费（円） */
  tollFromHaneda: number;
  /** 影响半径（公里），用于匹配用户地址 */
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
    label: { en: "Shibuya", ja: "渋谷", zh: "涩谷" },
    latlng: { lat: 35.6580, lng: 139.7016 },
    tollFromNarita: 3100,
    tollFromHaneda: 1500,
    radiusKm: 3
  },
  {
    label: { en: "Ginza / Chuo", ja: "銀座・中央区", zh: "银座/中央区" },
    latlng: { lat: 35.6717, lng: 139.7652 },
    tollFromNarita: 2800,
    tollFromHaneda: 1300,
    radiusKm: 3
  },
  {
    label: { en: "Tokyo Station / Marunouchi", ja: "東京駅・丸の内", zh: "东京站/丸之内" },
    latlng: { lat: 35.6812, lng: 139.7671 },
    tollFromNarita: 2800,
    tollFromHaneda: 1300,
    radiusKm: 2
  },
  {
    label: { en: "Roppongi / Minato", ja: "六本木・港区", zh: "六本木/港区" },
    latlng: { lat: 35.6605, lng: 139.7292 },
    tollFromNarita: 3000,
    tollFromHaneda: 1400,
    radiusKm: 3
  },
  {
    label: { en: "Asakusa / Taito", ja: "浅草・台東区", zh: "浅草/台东区" },
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
    label: { en: "Odaiba / Ariake", ja: "お台場・有明", zh: "台场/有明" },
    latlng: { lat: 35.6313, lng: 139.7756 },
    tollFromNarita: 3000,
    tollFromHaneda: 1200,
    radiusKm: 3
  },
  {
    label: { en: "Yokohama", ja: "横浜", zh: "横滨" },
    latlng: { lat: 35.4437, lng: 139.6380 },
    tollFromNarita: 4500,
    tollFromHaneda: 1800,
    radiusKm: 5
  },
  {
    label: { en: "Chiba City", ja: "千葉市", zh: "千叶市" },
    latlng: { lat: 35.6073, lng: 140.1063 },
    tollFromNarita: 2000,
    tollFromHaneda: 2500,
    radiusKm: 5
  }
];

/**
 * 根据坐标找到最近的高速费区域
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
 * Haversine 距离公式（公里）
 */
export function haversineDistance(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const a2 = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a2), Math.sqrt(1 - a2));
}
