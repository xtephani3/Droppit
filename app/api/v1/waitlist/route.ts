import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function normalizeEmail(email: unknown): string | null {
  if (typeof email !== "string") return null;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;
  // Basic sanity check (not fully RFC compliant).
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return null;
  return normalized;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const email = normalizeEmail(body?.email);
    const name = typeof body?.name === "string" ? body.name.trim() : undefined;

    if (!email) {
      return NextResponse.json({ msg: "Invalid email" }, { status: 400 });
    }

    const created = await prisma.waitlistEntry
      .create({
        data: {
          email,
          name: name && name.length > 0 ? name : null,
        },
        select: { id: true, email: true, createdAt: true },
      })
      .catch(async (err: unknown) => {
        // Unique constraint: email already exists.
        if (typeof err === "object" && err && "code" in err && err.code === "P2002") {
          const existing = await prisma.waitlistEntry.findUnique({
            where: { email },
            select: { id: true, email: true, createdAt: true },
          });
          if (existing) return existing;
        }
        throw err;
      });

    return NextResponse.json({ msg: "Success", entry: created }, { status: 201 });
  } catch (error) {
    console.error("Waitlist POST error:", error);
    return NextResponse.json({ msg: "Error" }, { status: 500 });
  }
}
