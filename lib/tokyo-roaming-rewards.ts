export type TokyoRoamingRewardRecord = {
  awardedAt: string;
  code: string;
  id: number;
};

export const tokyoRoamingRewardsTable = process.env.SUPABASE_TOKYO_ROAMING_REWARDS_TABLE || "tokyo_roaming_rewards";

function getSupabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return { configured: Boolean(url && serviceKey), serviceKey, url };
}

function formatRewardCode(id: number) {
  return String(id).padStart(2, "0");
}

async function supabaseRewardFetch(pathname: string, init: RequestInit = {}) {
  const { serviceKey, url } = getSupabaseConfig();
  if (!url || !serviceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  const headers = new Headers(init.headers);
  headers.set("apikey", serviceKey);

  if (!serviceKey.startsWith("sb_secret_")) {
    headers.set("Authorization", `Bearer ${serviceKey}`);
  }

  return fetch(`${url}${pathname}`, {
    ...init,
    headers,
    cache: "no-store"
  });
}

function normalizeReward(row: { awarded_at: string; id: number }): TokyoRoamingRewardRecord {
  return {
    awardedAt: row.awarded_at,
    code: formatRewardCode(row.id),
    id: row.id
  };
}

export function getTokyoRoamingRewardStorageStatus() {
  return {
    configured: getSupabaseConfig().configured,
    table: tokyoRoamingRewardsTable
  };
}

export async function createTokyoRoamingRewardRecord(userAgent?: string | null) {
  const response = await supabaseRewardFetch(`/rest/v1/${tokyoRoamingRewardsTable}?select=id,awarded_at`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      user_agent: userAgent?.slice(0, 300) || null
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Unable to create Tokyo Roaming reward record.");
  }

  const rows = (await response.json()) as Array<{ awarded_at: string; id: number }>;
  const row = rows[0];

  if (!row) {
    throw new Error("Tokyo Roaming reward insert returned no record.");
  }

  return normalizeReward(row);
}

export async function listTokyoRoamingRewardRecords(limit = 10) {
  if (!getSupabaseConfig().configured) return [];

  try {
    const response = await supabaseRewardFetch(
      `/rest/v1/${tokyoRoamingRewardsTable}?select=id,awarded_at&order=awarded_at.desc&limit=${limit}`
    );

    if (!response.ok) return [];

    const rows = (await response.json()) as Array<{ awarded_at: string; id: number }>;
    return rows.map(normalizeReward);
  } catch {
    return [];
  }
}

export async function listTokyoRoamingRewardRecordsPaged(
  page: number,
  pageSize: number
): Promise<{ records: TokyoRoamingRewardRecord[]; total: number }> {
  if (!getSupabaseConfig().configured) return { records: [], total: 0 };

  const offset = (page - 1) * pageSize;

  try {
    const response = await supabaseRewardFetch(
      `/rest/v1/${tokyoRoamingRewardsTable}?select=id,awarded_at&order=awarded_at.desc&limit=${pageSize}&offset=${offset}`,
      { headers: { Prefer: "count=exact" } }
    );

    if (!response.ok) return { records: [], total: 0 };

    const contentRange = response.headers.get("Content-Range") ?? "";
    const total = parseInt(contentRange.split("/")[1] ?? "0", 10) || 0;

    const rows = (await response.json()) as Array<{ awarded_at: string; id: number }>;
    return { records: rows.map(normalizeReward), total };
  } catch {
    return { records: [], total: 0 };
  }
}
