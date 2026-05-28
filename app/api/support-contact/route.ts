import { NextResponse } from "next/server";
import { getActiveSupportContact } from "@/lib/support-contact";

export const dynamic = "force-dynamic";

export async function GET() {
  const contact = await getActiveSupportContact();

  return NextResponse.json({
    active: {
      id: contact.id,
      label: contact.label,
      displayPhone: contact.displayPhone
    }
  });
}
