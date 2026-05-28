import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import { setActiveSupportContact } from "@/lib/support-contact";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(cookieStore.get(adminSessionCookieName)?.value);
  const url = new URL(request.url);

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", url), 303);
  }

  const formData = await request.formData();
  const contactId = String(formData.get("contactId") ?? "");

  try {
    await setActiveSupportContact(contactId);
    return NextResponse.redirect(new URL("/admin?updated=1", url), 303);
  } catch {
    return NextResponse.redirect(new URL("/admin?error=support-storage", url), 303);
  }
}
