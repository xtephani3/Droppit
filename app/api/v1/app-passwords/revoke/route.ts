import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function requireAdmin(req: NextRequest): NextResponse | null {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return NextResponse.json(
      { msg: "Server misconfigured: ADMIN_API_KEY not set" },
      { status: 500 },
    );
  }

  const provided = req.headers.get("x-admin-key");
  if (!provided || provided !== expected) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : null;
  if (!id) return NextResponse.json({ msg: "Missing id" }, { status: 400 });

  const updated = await prisma.appPassword.update({
    where: { id },
    data: { revokedAt: new Date() },
    select: {
      id: true,
      name: true,
      prefix: true,
      createdAt: true,
      lastUsedAt: true,
      revokedAt: true,
    },
  });

  return NextResponse.json({ password: updated }, { status: 200 });
}

