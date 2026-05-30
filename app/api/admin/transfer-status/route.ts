import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import { updateTransferStatus } from "@/lib/transfers";

export const dynamic = "force-dynamic";

const VALID_STATUSES = ["pending", "not_served", "served"];

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(cookieStore.get(adminSessionCookieName)?.value);
  const url = new URL(request.url);

  if (!session) return NextResponse.redirect(new URL("/admin/login", url), 303);

  const formData = await request.formData();
  const id = parseInt(String(formData.get("transferId") ?? ""), 10);
  const status = String(formData.get("status") ?? "");
  const returnFilter = String(formData.get("returnFilter") ?? "upcoming");

  if (!VALID_STATUSES.includes(status) || isNaN(id)) {
    return NextResponse.redirect(new URL(`/admin?tab=transfers&filter=${returnFilter}`, url), 303);
  }

  try {
    await updateTransferStatus(id, status);
  } catch {
    // silently ignore and redirect back
  }

  return NextResponse.redirect(new URL(`/admin?tab=transfers&filter=${returnFilter}`, url), 303);
}
