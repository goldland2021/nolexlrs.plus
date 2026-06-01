export type SupportContact = {
  id: string;
  label: string;
  displayPhone: string;
  whatsAppPhoneNumber: string;
};

export const supportContacts = [
  {
    id: "staff_7223",
    label: "Support +81 90-6399-7223",
    displayPhone: "+81 90-6399-7223",
    whatsAppPhoneNumber: "819063997223"
  }
] as const satisfies readonly SupportContact[];

export const defaultSupportContactId = "staff_7223";
const supportContactSettingsKey = "active_support_contact_id";
const roamingRewardSettingsKey = "tokyo_roaming_button_enabled";
const legacySupportContactIds = new Set(["staff_1812", "staff_6072"]);

function getSupabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_SITE_SETTINGS_TABLE || "site_settings";

  return { configured: Boolean(url && serviceKey), serviceKey, table, url };
}

export function findSupportContact(contactId?: string | null) {
  if (legacySupportContactIds.has(contactId ?? "")) {
    return supportContacts[0];
  }

  return supportContacts.find((contact) => contact.id === contactId) ?? null;
}

export function getDefaultSupportContact() {
  return findSupportContact(process.env.DEFAULT_SUPPORT_CONTACT_ID) ?? findSupportContact(defaultSupportContactId)!;
}

function getDefaultRoamingRewardButtonEnabled() {
  return process.env.DEFAULT_TOKYO_ROAMING_BUTTON_ENABLED === "true";
}

async function supabaseSettingsFetch(pathname: string, init: RequestInit = {}) {
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

async function getSiteSettingValue(key: string) {
  const { configured, table } = getSupabaseConfig();

  if (!configured) return null;

  try {
    const response = await supabaseSettingsFetch(
      `/rest/v1/${table}?key=eq.${encodeURIComponent(key)}&select=value&limit=1`
    );

    if (!response.ok) return null;

    const rows = (await response.json()) as Array<{ value?: string | null }>;
    return rows[0]?.value ?? null;
  } catch {
    return null;
  }
}

async function setSiteSettingValue(key: string, value: string) {
  const { table } = getSupabaseConfig();
  const response = await supabaseSettingsFetch(`/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      key,
      value,
      updated_at: new Date().toISOString()
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Unable to update site setting.");
  }
}

export async function getActiveSupportContact() {
  const fallback = getDefaultSupportContact();
  const contactId = await getSiteSettingValue(supportContactSettingsKey);
  return findSupportContact(contactId) ?? fallback;
}

export async function setActiveSupportContact(contactId: string) {
  const contact = findSupportContact(contactId);
  if (!contact) {
    throw new Error("Unknown support contact.");
  }

  await setSiteSettingValue(supportContactSettingsKey, contact.id);

  return contact;
}

export async function getRoamingRewardButtonEnabled() {
  const value = await getSiteSettingValue(roamingRewardSettingsKey);

  if (value === null) return getDefaultRoamingRewardButtonEnabled();

  return value.toLowerCase() !== "false";
}

export async function setRoamingRewardButtonEnabled(enabled: boolean) {
  await setSiteSettingValue(roamingRewardSettingsKey, enabled ? "true" : "false");
  return enabled;
}

export function getSupportContactStorageStatus() {
  const { configured, table } = getSupabaseConfig();
  return { configured, table };
}
