import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import { setRoamingRewardButtonEnabled } from "@/lib/support-contact";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(cookieStore.get(adminSessionCookieName)?.value);
  const url = new URL(request.url);

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", url), 303);
  }

  const formData = await request.formData();
  const enabled = String(formData.get("enabled") ?? "") === "true";

  try {
    await setRoamingRewardButtonEnabled(enabled);
    return NextResponse.redirect(new URL("/admin?tab=promo&updated=roaming", url), 303);
  } catch {
    return NextResponse.redirect(new URL("/admin?tab=promo&error=support-storage", url), 303);
  }
}
