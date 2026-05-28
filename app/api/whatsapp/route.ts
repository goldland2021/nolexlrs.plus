import { NextResponse } from "next/server";
import { defaultWhatsAppMessage } from "@/lib/whatsapp";
import { getActiveSupportContact } from "@/lib/support-contact";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const message = url.searchParams.get("text") || defaultWhatsAppMessage;
  const contact = await getActiveSupportContact();
  const target = `https://wa.me/${contact.whatsAppPhoneNumber}?text=${encodeURIComponent(message)}`;

  return NextResponse.redirect(target, 302);
}
