import fs from "node:fs";
import path from "node:path";

const csvPath = process.argv[2] ?? "data/tokyo-ground-costs.csv";
const tableName = process.argv[3] ?? process.env.SUPABASE_GROUND_COST_TABLE ?? "ground_cost_quotes";
const batchSize = Number(process.argv[4] ?? "500");

function loadEnvFile(filePath = ".env.local") {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (!match) continue;

    const key = match[1].trim();
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] ??= value;
  }
}

function parseCsv(content) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const next = content[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  if (field || row.length) {
    row.push(field);
    if (row.some((value) => value !== "")) rows.push(row);
  }

  if (rows.length === 0) return [];
  rows[0][0] = rows[0][0].replace(/^\uFEFF/, "");

  const headers = rows[0];
  return rows.slice(1).map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]))
  );
}

function blankToNull(value) {
  return value === "" || value == null ? null : value;
}

function numberOrNull(value) {
  const normalized = blankToNull(value);
  if (normalized == null) return null;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function intOrNull(value) {
  const number = numberOrNull(value);
  return number == null ? null : Math.round(number);
}

function yesNoToBoolean(value) {
  if (value === "yes") return true;
  if (value === "no") return false;
  return null;
}

function toDbRow(row) {
  return {
    sample_id: blankToNull(row.sample_id),
    source_line: intOrNull(row.source_line),
    date_text: blankToNull(row.date_text),
    pickup_time: blankToNull(row.pickup_time),
    time_band: blankToNull(row.time_band),
    service_type: blankToNull(row.service_type),
    direction: blankToNull(row.direction),
    airport_id: blankToNull(row.airport_id),
    airport_name: blankToNull(row.airport_name),
    origin: blankToNull(row.origin),
    destination: blankToNull(row.destination),
    destination_area: blankToNull(row.destination_area),
    vehicle_class: blankToNull(row.vehicle_class),
    seats: intOrNull(row.seats),
    green_plate: yesNoToBoolean(row.green_plate),
    meet_greet: yesNoToBoolean(row.meet_greet),
    child_seats: yesNoToBoolean(row.child_seats),
    driver_language: blankToNull(row.driver_language),
    duration_hours: numberOrNull(row.duration_hours),
    flight_number: blankToNull(row.flight_number),
    original_amount: numberOrNull(row.original_amount),
    original_currency: blankToNull(row.original_currency),
    currency_confidence: blankToNull(row.currency_confidence),
    cny_jpy_rate: numberOrNull(row.cny_jpy_rate),
    cost_jpy: intOrNull(row.cost_jpy),
    pricing_note: blankToNull(row.pricing_note),
    parse_confidence: blankToNull(row.parse_confidence),
    raw_text: blankToNull(row.raw_text)
  };
}

function getContentRangeTotal(range) {
  if (!range) return null;
  const match = range.match(/\/(\d+|\*)$/);
  if (!match || match[1] === "*") return null;
  return Number(match[1]);
}

async function supabaseFetch(pathname, init = {}) {
  const url = new URL(pathname, supabaseUrl);
  const response = await fetch(url, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      ...init.headers
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${init.method ?? "GET"} ${pathname} failed: ${response.status} ${body}`);
  }

  return response;
}

loadEnvFile();

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

if (!fs.existsSync(csvPath)) {
  console.error(`CSV file not found: ${csvPath}`);
  process.exit(1);
}

const csv = fs.readFileSync(csvPath, "utf8");
const rows = parseCsv(csv).map(toDbRow);
const highConfidenceRows = rows.filter((row) => row.parse_confidence === "high");

if (highConfidenceRows.length !== rows.length) {
  console.error(`CSV contains non-high rows. Refusing import. rows=${rows.length}, high=${highConfidenceRows.length}`);
  process.exit(1);
}

console.log(`Preparing to import ${rows.length} rows into ${tableName}`);

const countResponse = await supabaseFetch(`/rest/v1/${tableName}?select=sample_id&limit=1`, {
  headers: {
    Prefer: "count=exact"
  }
});
const existingCount = getContentRangeTotal(countResponse.headers.get("content-range"));

if (existingCount && existingCount > 0) {
  console.error(`Table ${tableName} already has ${existingCount} rows. Stop now to avoid duplicate imports.`);
  process.exit(1);
}

for (let start = 0; start < rows.length; start += batchSize) {
  const batch = rows.slice(start, start + batchSize);
  await supabaseFetch(`/rest/v1/${tableName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(batch)
  });
  console.log(`Imported ${Math.min(start + batch.length, rows.length)} / ${rows.length}`);
}

const verifyResponse = await supabaseFetch(`/rest/v1/${tableName}?select=sample_id&limit=1`, {
  headers: {
    Prefer: "count=exact"
  }
});
const finalCount = getContentRangeTotal(verifyResponse.headers.get("content-range"));

const csvName = path.basename(csvPath);
console.log(`Done. Imported ${rows.length} rows from ${csvName}. Supabase row count: ${finalCount ?? "unknown"}`);
