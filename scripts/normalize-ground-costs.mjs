import fs from "node:fs";
import path from "node:path";

const inputPath = process.argv[2];
const outputPath = process.argv[3] ?? "data/tokyo-ground-costs.csv";
const cnyJpyRateArg = Number(process.argv[4] ?? "23.2");
const cnyJpyRate = Number.isFinite(cnyJpyRateArg) && cnyJpyRateArg > 0 ? cnyJpyRateArg : 23.2;

if (!inputPath) {
  console.error("Usage: node scripts/normalize-ground-costs.mjs <input.txt> [output.csv] [cny_jpy_rate]");
  process.exit(1);
}

const airportAliases = [
  ["haneda", "Haneda Airport", /羽田|HND/i],
  ["narita", "Narita Airport", /成田|NRT/i],
  ["kansai", "Kansai Airport", /关西|關西|KIX/i],
  ["itami", "Itami Airport", /伊丹|ITM/i],
  ["fukuoka", "Fukuoka Airport", /福冈|福岡|FUK/i],
  ["naha", "Naha Airport", /那霸|那覇|OKA/i],
  ["new_chitose", "New Chitose Airport", /新千岁|新千歳|CTS/i]
];

const knownAreas = [
  "新宿", "港区", "港區", "中央", "中央区", "中央區", "银座", "銀座", "台东", "台東", "台东区", "台東区",
  "浅草", "淺草", "千代田", "渋谷", "涩谷", "澀谷", "池袋", "豊島", "丰岛", "豐島", "墨田", "文京",
  "江东", "江東", "品川", "浦安", "横滨", "横浜", "世田谷", "练马", "練馬", "板桥", "板橋", "北区",
  "江户川", "江戸川", "大田", "中野", "杉并", "杉並", "台场", "台場", "有明", "六本木", "日本桥",
  "日本橋", "西日暮里", "赤坂", "龟户", "亀戸", "蕨", "轻井泽", "軽井沢", "河口湖", "富士山",
  "箱根", "京都", "大阪", "难波", "難波", "迪士尼", "舞浜", "舞滨", "横滨港", "横浜港", "清水港",
  "东京站", "東京站", "东京駅", "東京駅", "JR東京站", "JR东京站", "品川站", "上野", "神田", "赤羽"
];

const skipPatterns = [
  /卖车|賣車|油电混合|走行|修复历|私信联系/,
  /餐饮|蟹长者|股份|哈哈|欢迎各位老板咨询/,
  /青蒿素|帮忙带|有偿/,
  /谢谢老板|谢谢|抱拳|Chuckle|旺柴|必须|重点/,
  /微信不收款|换单$|接$|出$|现在客人出来了$/
];

const servicePatterns = [
  /羽田|成田|关西|關西|KIX|伊丹|福冈|福岡|那霸|那覇|机场|機場|空港/,
  /阿尔法|埃尔法|海狮|海獅|ハイエース|考斯特|大巴|绿法|白法|法子|法三|三代|四代/,
  /包车|包車|富士山|河口湖|箱根|京都|大阪|横滨|横浜|清水港|港口|新干线|新幹線|JR|東京站|东京站/,
  /送机|送機|接机|接機|举牌|舉牌|协助入住|協助入住/
];

function normalizeText(value) {
  return value
    .replace(/\uFEFF/g, "")
    .replace(/[，、]/g, " ")
    .replace(/[：]/g, ":")
    .replace(/[～—–]/g, "-")
    .replace(/➡️|➡|→/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function csvEscape(value) {
  const text = value == null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function roundTo100(value) {
  return Math.round(value / 100) * 100;
}

function findAirport(text) {
  for (const [id, name, pattern] of airportAliases) {
    if (pattern.test(text)) return { id, name };
  }
  return { id: "", name: "" };
}

function findArea(text, exclude = "") {
  return knownAreas.find((area) => area !== exclude && text.includes(area)) ?? "";
}

function extractTime(text) {
  const match = text.match(/(?:^|\D)([012]?\d[:点時]\d{2})(?:\D|$)/);
  return match ? match[1].replace(/[点時]/g, ":") : "";
}

function extractDateText(text) {
  const match =
    text.match(/(?:\d{1,2}[./]\d{1,2})|(?:\d{1,2}月\d{1,2}[日号號]?)|(?:\d{1,2}[日号號])|今天|明天|今晚|明早/);
  return match ? match[0] : "";
}

function extractFlight(text) {
  const matches = [...text.matchAll(/\b([A-Z]{1,3}\*?\d{2,4})\b/g)].map((m) => m[1]);
  const filtered = matches.filter((code) => !/^(JR|T[123]|AM|PM)$/i.test(code));
  return filtered[0] ?? "";
}

function extractDurationHours(text) {
  const match = text.match(/(\d+(?:\.\d+)?)\s*(?:小时|小時|時間|h|H)\b/);
  return match ? match[1] : "";
}

function extractSeats(text) {
  const match = text.match(/(\d{1,2})\s*(?:座|人座|位)/);
  if (match) return match[1];
  const compact = text.match(/(?:^|\s)(\d{1,2})\s*绿/);
  return compact ? compact[1] : "";
}

function detectVehicle(text, seats) {
  if (/考斯特/i.test(text)) return "coaster";
  if (/大巴|bus/i.test(text)) return "bus";
  if (/海狮|海獅|ハイエース|hiace/i.test(text)) return "hiace";
  if (/阿尔法|埃尔法|アルファード|法子|法三|三代|四代|白法|绿法|綠法|法绿|法綠/i.test(text)) return "alphard";
  if (Number(seats) >= 9 && Number(seats) <= 14) return "hiace_or_van";
  return "";
}

function detectServiceType(text) {
  if (/新干线|新幹線|JR|東京站|东京站|東京駅|东京駅|品川站/.test(text)) return "shinkansen_station_transfer";
  if (/清水港|横滨港|横浜港|港口|邮轮|郵輪/.test(text)) return "port_transfer";
  if (/包车|包車|富士山|河口湖|箱根|京都|大阪|伊豆|御殿场|御殿場|轻井泽|軽井沢|奥莱|奧萊/.test(text)) {
    return "charter_or_long_distance";
  }
  if (/羽田|成田|关西|關西|KIX|伊丹|福冈|福岡|那霸|那覇|机场|機場|空港/.test(text)) return "airport_transfer";
  return "ground_transfer";
}

function extractRoute(text, airport) {
  const cleaned = text
    .replace(/(?:今天|明天|今晚|明早|\d{1,2}[./]\d{1,2}|\d{1,2}月\d{1,2}[日号號]?|\d{1,2}[日号號])/g, " ")
    .replace(/\d{1,2}[:点時]\d{2}/g, " ")
    .replace(/\b[A-Z]{1,3}\*?\d{2,4}\b/g, " ")
    .replace(/\d+(?:,\d{3})*(?:\.\d+)?\s*(?:日元|日币|日幣|円|元|JPY|CNY|RMB)?/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const routeMatch = cleaned.match(/(.{1,30}?)[\-到](.{1,36})/);
  if (routeMatch) {
    const origin = cleanPlace(routeMatch[1]);
    const destination = cleanPlace(routeMatch[2]);
    return { origin, destination };
  }

  if (airport.id) {
    const area = findArea(cleaned, airport.name);
    if (/送机|送機|送.*(?:羽田|成田|关西|關西|KIX|机场|機場)|(?:新宿|港区|銀座|银座|浅草|台东|台東|中央|千代田|池袋|豊島|墨田|文京|江东|江東|品川|横滨|横浜).{0,8}(?:羽田|成田|机场|機場)/.test(cleaned)) {
      return { origin: area, destination: airport.name };
    }
    return { origin: airport.name, destination: area };
  }

  return { origin: "", destination: "" };
}

function cleanPlace(value) {
  return value
    .replace(/^(?:今天|明天|今晚|明早|\d{1,2}[./]\d{1,2}|\d{1,2}月\d{1,2}[日号號]?|\d{1,2}[日号號])\s*/g, "")
    .replace(/^[\s.\/:点時月日号號-]+/g, "")
    .replace(/\b(?:绿牌|绿|白|可|海狮|海獅|阿尔法|埃尔法|法子|法三|三代|四代|高速|接机|接機|送机|送機)\b/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function detectDirection(text, route, airport) {
  if (!airport.id) return "";
  const originHasAirport = route.origin.includes(airport.name) || /羽田|成田|关西|關西|KIX|伊丹|福冈|福岡|那霸|那覇/.test(route.origin);
  const destHasAirport = route.destination.includes(airport.name) || /羽田|成田|关西|關西|KIX|伊丹|福冈|福岡|那霸|那覇/.test(route.destination);
  if (originHasAirport && !destHasAirport) return "pickup";
  if (destHasAirport && !originHasAirport) return "dropoff";
  if (/接机|接機|落地|机场.*(?:-|到)|空港お迎え/.test(text)) return "pickup";
  if (/送机|送機|送.*(?:羽田|成田|机场|機場|空港)/.test(text)) return "dropoff";
  return "";
}

function isNightTime(time) {
  if (!time) return "";
  const hour = Number(time.split(":")[0]);
  if (!Number.isFinite(hour)) return "";
  return hour < 6 || hour >= 22 ? "night" : "daytime";
}

function detectCurrency(text, amount, explicitCurrency) {
  if (explicitCurrency === "JPY") return { currency: "JPY", confidence: "explicit" };
  if (explicitCurrency === "CNY") return { currency: "CNY", confidence: "explicit" };
  if (/日元|日币|日幣|円|JPY/i.test(text)) return { currency: "JPY", confidence: "explicit_context" };
  if (/人民币|人民幣|RMB|CNY/i.test(text)) return { currency: "CNY", confidence: "explicit_context" };
  if (/元/.test(text) && amount < 5000 && !/日元/.test(text)) return { currency: "CNY", confidence: "explicit_yuan_symbol" };
  if (amount <= 3000) return { currency: "CNY", confidence: "inferred_small_amount" };
  if (amount > 3000 && amount < 5000) return { currency: "CNY", confidence: "inferred_mid_amount" };
  return { currency: "JPY", confidence: "inferred_large_amount" };
}

function extractPrice(text) {
  const normalized = text.replace(/,/g, "");

  const explicitJpy = [...normalized.matchAll(/(\d+(?:\.\d+)?)\s*(?:日元|日币|日幣|円|JPY|yen)/gi)];
  if (explicitJpy.length) return { amount: Number(explicitJpy.at(-1)[1]), explicitCurrency: "JPY" };

  const explicitCny = [...normalized.matchAll(/(\d+(?:\.\d+)?)\s*(?:人民币|人民幣|RMB|CNY|元)/gi)]
    .filter((m) => !/日元/.test(normalized.slice(Math.max(0, m.index - 2), m.index + m[0].length + 2)));
  if (explicitCny.length) return { amount: Number(explicitCny.at(-1)[1]), explicitCurrency: "CNY" };

  const wan = [...normalized.matchAll(/(\d+(?:\.\d+)?)\s*(?:万|w|W)(?!円)/g)];
  if (wan.length) return { amount: Number(wan.at(-1)[1]) * 10000, explicitCurrency: "JPY" };

  const candidates = [];
  for (const match of normalized.matchAll(/\d+(?:\.\d+)?/g)) {
    const raw = match[0];
    const amount = Number(raw);
    const index = match.index ?? 0;
    const before = normalized[index - 1] ?? "";
    const after = normalized[index + raw.length] ?? "";
    const afterText = normalized.slice(index + raw.length, index + raw.length + 3);
    const beforeText = normalized.slice(Math.max(0, index - 3), index);

    if (!Number.isFinite(amount) || amount < 100 || amount > 200000) continue;
    if (before === ":" || after === ":" || before === "." || after === ".") continue;
    if (/[A-Za-z]/.test(before) || /[A-Za-z]/.test(after)) continue;
    if (/座|位|人|公里|km|点|時|:/.test(afterText)) continue;
    if (/月|\/|\./.test(beforeText) && amount < 10000) continue;
    candidates.push({ amount, explicitCurrency: "" });
  }

  return candidates.at(-1) ?? null;
}

function buildBlock(lines, index) {
  const current = normalizeText(lines[index] ?? "");
  const prev = normalizeText(lines[index - 1] ?? "");
  const prev2 = normalizeText(lines[index - 2] ?? "");
  const next = normalizeText(lines[index + 1] ?? "");
  const routeSignalPattern = /[-到]|羽田|成田|关西|關西|KIX|富士山|河口湖|箱根|京都|大阪|东京|東京|横滨|横浜|清水港|港|新干线|新幹線|JR|包车|包車/;

  if (/^\d+(?:\.\d+)?$/.test(current) && (servicePatterns.some((pattern) => pattern.test(prev)) || servicePatterns.some((pattern) => pattern.test(prev2)))) {
    return [prev2, prev, current].filter(Boolean).join(" ");
  }

  if (!extractPrice(current) && servicePatterns.some((pattern) => pattern.test(current)) && /^\d+(?:\.\d+)?$/.test(next)) {
    const prevHasRoute = routeSignalPattern.test(prev);
    return [prevHasRoute ? prev : "", current, next].filter(Boolean).join(" ");
  }

  if (extractPrice(current) && current.length <= 35 && !routeSignalPattern.test(current)) {
    const prevHasRoute = routeSignalPattern.test(prev);
    if (prevHasRoute) return `${prev} ${current}`;
  }

  return current;
}

function shouldKeep(text) {
  if (!text || text.length < 4) return false;
  if (skipPatterns.some((pattern) => pattern.test(text))) return false;
  if (!extractPrice(text)) return false;
  return servicePatterns.some((pattern) => pattern.test(text));
}

const raw = fs.readFileSync(inputPath, "utf8");
const lines = raw.split(/\r?\n/);
const rows = [];
const seen = new Set();

for (let i = 0; i < lines.length; i += 1) {
  const text = buildBlock(lines, i);
  const normalized = normalizeText(text);
  if (!shouldKeep(normalized)) continue;

  const price = extractPrice(normalized);
  if (!price) continue;
  const { currency, confidence } = detectCurrency(normalized, price.amount, price.explicitCurrency);
  const costJpy = currency === "CNY" ? roundTo100(price.amount * cnyJpyRate) : Math.round(price.amount);
  if (!Number.isFinite(costJpy) || costJpy <= 0) continue;

  const airport = findAirport(normalized);
  const dateText = extractDateText(normalized);
  const pickupTime = extractTime(normalized);
  const seats = extractSeats(normalized);
  const vehicleClass = detectVehicle(normalized, seats);
  const route = extractRoute(normalized, airport);
  const direction = detectDirection(normalized, route, airport);
  const serviceType = detectServiceType(normalized);
  const destinationArea = route.destination && !route.destination.includes("Airport") ? route.destination : findArea(normalized);
  const meetGreet = /举牌|舉牌|正装|正裝|协助入住|協助入住/.test(normalized) ? "yes" : "no";
  const childSeats = /儿童座椅|兒童座椅|婴儿座椅|嬰兒座椅/.test(normalized) ? "yes" : "no";
  const greenPlate = /绿牌|綠牌|绿|綠/.test(normalized) ? "yes" : "no";
  const driverLanguage = /英文|英语|英語/.test(normalized) ? "english" : /日语|日語/.test(normalized) ? "japanese" : "";
  const timeBand = isNightTime(pickupTime);
  const flightNumber = extractFlight(normalized);
  const durationHours = extractDurationHours(normalized);
  const pricingNote = /或|套|加|代收|高速|协办入住|協辦入住/.test(normalized) ? normalized.match(/(?:或|套|加|代收|高速|协办入住|協辦入住).{0,30}/)?.[0] ?? "" : "";
  const hasRouteSignal =
    Boolean(airport.id || route.origin || route.destination || destinationArea || durationHours) ||
    /富士山|河口湖|箱根|京都|大阪|伊豆|御殿场|御殿場|轻井泽|軽井沢|横滨|横浜|清水港|港口|新干线|新幹線|JR/.test(normalized);
  if (!hasRouteSignal) continue;

  const parseConfidence = route.origin && route.destination ? "high" : airport.id || destinationArea ? "medium" : "low";
  const key = `${normalized}|${price.amount}|${currency}`;
  if (seen.has(key)) continue;
  seen.add(key);

  rows.push({
    sample_id: `ground_cost_${String(rows.length + 1).padStart(4, "0")}`,
    source_line: i + 1,
    date_text: dateText,
    pickup_time: pickupTime,
    time_band: timeBand,
    service_type: serviceType,
    direction,
    airport_id: airport.id,
    airport_name: airport.name,
    origin: route.origin,
    destination: route.destination,
    destination_area: destinationArea,
    vehicle_class: vehicleClass,
    seats,
    green_plate: greenPlate,
    meet_greet: meetGreet,
    child_seats: childSeats,
    driver_language: driverLanguage,
    duration_hours: durationHours,
    flight_number: flightNumber,
    original_amount: price.amount,
    original_currency: currency,
    currency_confidence: confidence,
    cny_jpy_rate: currency === "CNY" ? cnyJpyRate : "",
    cost_jpy: costJpy,
    pricing_note: pricingNote,
    parse_confidence: parseConfidence,
    raw_text: normalized
  });
}

const columns = [
  "sample_id",
  "source_line",
  "date_text",
  "pickup_time",
  "time_band",
  "service_type",
  "direction",
  "airport_id",
  "airport_name",
  "origin",
  "destination",
  "destination_area",
  "vehicle_class",
  "seats",
  "green_plate",
  "meet_greet",
  "child_seats",
  "driver_language",
  "duration_hours",
  "flight_number",
  "original_amount",
  "original_currency",
  "currency_confidence",
  "cny_jpy_rate",
  "cost_jpy",
  "pricing_note",
  "parse_confidence",
  "raw_text"
];

const csv = [
  columns.join(","),
  ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(","))
].join("\n");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `\uFEFF${csv}\n`, "utf8");

console.log(`Wrote ${rows.length} rows to ${outputPath}`);
console.log(`CNY->JPY rate used: ${cnyJpyRate}`);
