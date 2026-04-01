import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createAppPasswordToken } from "@/lib/app-passwords";

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

export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const passwords = await prisma.appPassword.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      prefix: true,
      createdAt: true,
      lastUsedAt: true,
      revokedAt: true,
    },
  });

  return NextResponse.json({ passwords }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (!name) return NextResponse.json({ msg: "Missing name" }, { status: 400 });

  const { token, prefix, hash } = createAppPasswordToken();

  const created = await prisma.appPassword.create({
    data: { name, prefix, hash },
    select: {
      id: true,
      name: true,
      prefix: true,
      createdAt: true,
      lastUsedAt: true,
      revokedAt: true,
    },
  });

  // Return token only once.
  return NextResponse.json({ password: created, token }, { status: 201 });
}

