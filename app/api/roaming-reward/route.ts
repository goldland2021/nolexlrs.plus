import { NextResponse } from "next/server";
import { getRoamingRewardButtonEnabled } from "@/lib/support-contact";

export const dynamic = "force-dynamic";

export async function GET() {
  const enabled = await getRoamingRewardButtonEnabled();

  return NextResponse.json({ enabled });
}
