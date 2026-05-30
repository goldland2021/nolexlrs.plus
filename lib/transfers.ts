export type TransferRecord = {
  id: number;
  bookingNo: string;
  tripType: string;
  serviceDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  flightNumber: string | null;
  flightTime: string | null;
  passengerName: string;
  passengers: number;
  luggage: string | null;
  customerWhatsapp: string | null;
  meetGreet: boolean;
  fareJpy: number | null;
  driverName: string | null;
  vehicleType: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
};

function getSupabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { configured: Boolean(url && serviceKey), serviceKey, url };
}

async function supabaseFetch(pathname: string, init: RequestInit = {}) {
  const { serviceKey, url } = getSupabaseConfig();
  if (!url || !serviceKey) throw new Error("Missing Supabase config.");
  const headers = new Headers(init.headers);
  headers.set("apikey", serviceKey);
  if (!serviceKey.startsWith("sb_secret_")) {
    headers.set("Authorization", `Bearer ${serviceKey}`);
  }
  return fetch(`${url}${pathname}`, { ...init, headers, cache: "no-store" });
}

function normalizeRow(row: Record<string, unknown>): TransferRecord {
  return {
    id: row.id as number,
    bookingNo: (row.booking_no as string) ?? "",
    tripType: (row.trip_type as string) ?? "",
    serviceDate: (row.service_date as string) ?? "",
    pickupLocation: (row.pickup_location as string) ?? "",
    dropoffLocation: (row.dropoff_location as string) ?? "",
    flightNumber: (row.flight_number as string | null) ?? null,
    flightTime: (row.flight_time as string | null) ?? null,
    passengerName: (row.passenger_name as string) ?? "",
    passengers: (row.passengers as number) ?? 1,
    luggage: (row.luggage as string | null) ?? null,
    customerWhatsapp: (row.customer_whatsapp as string | null) ?? null,
    meetGreet: Boolean(row.meet_greet),
    fareJpy: (row.fare_jpy as number | null) ?? null,
    driverName: (row.driver_name as string | null) ?? null,
    vehicleType: (row.vehicle_type as string | null) ?? null,
    status: (row.status as string) ?? "pending",
    notes: (row.notes as string | null) ?? null,
    createdAt: (row.created_at as string) ?? "",
  };
}

export async function updateTransferVehicleType(id: number, vehicleType: string | null): Promise<void> {
  const res = await supabaseFetch(`/rest/v1/transfers?id=eq.${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ vehicle_type: vehicleType, updated_at: new Date().toISOString() })
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || "Failed to update transfer vehicle type.");
  }
}

export async function updateTransferStatus(id: number, status: string): Promise<void> {
  const res = await supabaseFetch(`/rest/v1/transfers?id=eq.${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ status, updated_at: new Date().toISOString() })
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || "Failed to update transfer status.");
  }
}

export async function listTransfers(filter: "upcoming" | "past" | "all" = "upcoming"): Promise<TransferRecord[]> {
  if (!getSupabaseConfig().configured) return [];
  const today = new Date().toISOString().split("T")[0];
  let qs = "/rest/v1/transfers?select=*";
  if (filter === "upcoming") {
    qs += `&service_date=gte.${today}&order=service_date.asc`;
  } else if (filter === "past") {
    qs += `&service_date=lt.${today}&order=service_date.desc&limit=30`;
  } else {
    qs += "&order=service_date.desc&limit=100";
  }
  try {
    const res = await supabaseFetch(qs);
    if (!res.ok) return [];
    const rows = (await res.json()) as Record<string, unknown>[];
    return rows.map(normalizeRow);
  } catch {
    return [];
  }
}
