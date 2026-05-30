import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import { updateTransferVehicleType } from "@/lib/transfers";

export const dynamic = "force-dynamic";

const VALID_VEHICLES = ["hiace", "alphard"];

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(cookieStore.get(adminSessionCookieName)?.value);
  const url = new URL(request.url);

  if (!session) return NextResponse.redirect(new URL("/admin/login", url), 303);

  const formData = await request.formData();
  const id = parseInt(String(formData.get("transferId") ?? ""), 10);
  const vehicle = String(formData.get("vehicle") ?? "");
  const returnFilter = String(formData.get("returnFilter") ?? "upcoming");

  if (isNaN(id)) {
    return NextResponse.redirect(new URL(`/admin?tab=transfers&filter=${returnFilter}`, url), 303);
  }

  try {
    await updateTransferVehicleType(id, VALID_VEHICLES.includes(vehicle) ? vehicle : null);
  } catch {
    // silently ignore
  }

  return NextResponse.redirect(new URL(`/admin?tab=transfers&filter=${returnFilter}`, url), 303);
}
