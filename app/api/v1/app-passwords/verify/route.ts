import { NextRequest, NextResponse } from "next/server";
import { parseBearerToken, verifyAppPassword } from "@/lib/app-passwords";

export async function POST(req: NextRequest) {
  const token = parseBearerToken(req.headers.get("authorization"));
  if (!token) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

  const verified = await verifyAppPassword(token);
  if (!verified) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

  return NextResponse.json({ ok: true, password: verified }, { status: 200 });
}

