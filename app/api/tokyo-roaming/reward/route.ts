import { NextResponse } from "next/server";
import { createTokyoRoamingRewardRecord } from "@/lib/tokyo-roaming-rewards";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const reward = await createTokyoRoamingRewardRecord(request.headers.get("user-agent"));

    return NextResponse.json({
      awardedAt: reward.awardedAt,
      code: reward.code,
      synced: true
    });
  } catch {
    return NextResponse.json(
      {
        awardedAt: new Date().toISOString(),
        code: "01",
        synced: false
      },
      { status: 503 }
    );
  }
}
