export type SupportContact = {
  id: string;
  label: string;
  displayPhone: string;
  whatsAppPhoneNumber: string;
};

export const supportContacts = [
  {
    id: "staff_1812",
    label: "Support +81 80-4789-1812",
    displayPhone: "+81 80-4789-1812",
    whatsAppPhoneNumber: "818047891812"
  },
  {
    id: "staff_6072",
    label: "Support +81 80-9277-6072",
    displayPhone: "+81 80-9277-6072",
    whatsAppPhoneNumber: "818092776072"
  }
] as const satisfies readonly SupportContact[];

export const defaultSupportContactId = "staff_6072";
const settingsKey = "active_support_contact_id";

function getSupabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_SITE_SETTINGS_TABLE || "site_settings";

  return { configured: Boolean(url && serviceKey), serviceKey, table, url };
}

export function findSupportContact(contactId?: string | null) {
  return supportContacts.find((contact) => contact.id === contactId) ?? null;
}

export function getDefaultSupportContact() {
  return findSupportContact(process.env.DEFAULT_SUPPORT_CONTACT_ID) ?? findSupportContact(defaultSupportContactId)!;
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

export async function getActiveSupportContact() {
  const fallback = getDefaultSupportContact();
  const { configured, table } = getSupabaseConfig();

  if (!configured) return fallback;

  try {
    const response = await supabaseSettingsFetch(
      `/rest/v1/${table}?key=eq.${encodeURIComponent(settingsKey)}&select=value&limit=1`
    );

    if (!response.ok) return fallback;

    const rows = (await response.json()) as Array<{ value?: string | null }>;
    return findSupportContact(rows[0]?.value) ?? fallback;
  } catch {
    return fallback;
  }
}

export async function setActiveSupportContact(contactId: string) {
  const contact = findSupportContact(contactId);
  if (!contact) {
    throw new Error("Unknown support contact.");
  }

  const { table } = getSupabaseConfig();
  const response = await supabaseSettingsFetch(`/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      key: settingsKey,
      value: contact.id,
      updated_at: new Date().toISOString()
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Unable to update support contact.");
  }

  return contact;
}

export function getSupportContactStorageStatus() {
  const { configured, table } = getSupabaseConfig();
  return { configured, table };
}
