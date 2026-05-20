import fs from "node:fs";

const tableName = process.argv[2] ?? process.env.SUPABASE_GROUND_COST_TABLE ?? "ground_cost_quotes";

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

function groupBy(rows, key) {
  const counts = new Map();
  for (const row of rows) {
    const value = row[key] || "(blank)";
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}

async function supabaseFetch(pathname, init = {}) {
  const response = await fetch(`${supabaseUrl}${pathname}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      ...init.headers
    }
  });

  if (!response.ok) {
    throw new Error(`${pathname} failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function fetchAllRows() {
  const rows = [];
  const pageSize = 1000;

  for (let from = 0; ; from += pageSize) {
    const to = from + pageSize - 1;
    const page = await supabaseFetch(
      `/rest/v1/${tableName}?select=service_type,original_currency,airport_id,parse_confidence`,
      {
        headers: {
          Range: `${from}-${to}`
        }
      }
    );
    rows.push(...page);
    if (page.length < pageSize) return rows;
  }
}

loadEnvFile();

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const rows = await fetchAllRows();

console.log(`rows=${rows.length}`);
console.log("parse_confidence", groupBy(rows, "parse_confidence"));
console.log("service_type", groupBy(rows, "service_type"));
console.log("original_currency", groupBy(rows, "original_currency"));
console.log("airport_id", groupBy(rows, "airport_id").slice(0, 10));
