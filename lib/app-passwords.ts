import crypto from "node:crypto";
import prisma from "@/lib/prisma";

export type AppPasswordPublic = {
  id: string;
  name: string;
  prefix: string;
  createdAt: Date;
  lastUsedAt: Date | null;
  revokedAt: Date | null;
};

function sha256Hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function base64Url(bytes: Buffer): string {
  return bytes
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

export function createAppPasswordToken(): { token: string; prefix: string; hash: string } {
  const prefix = base64Url(crypto.randomBytes(6)); // 8-ish chars
  const secret = base64Url(crypto.randomBytes(24));
  const token = `ap_${prefix}_${secret}`;
  const hash = sha256Hex(token);
  return { token, prefix, hash };
}

export function parseBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const [scheme, value] = authHeader.split(" ");
  if (!scheme || !value) return null;
  if (scheme.toLowerCase() !== "bearer") return null;
  return value.trim() || null;
}

export async function verifyAppPassword(token: string): Promise<AppPasswordPublic | null> {
  if (!token.startsWith("ap_")) return null;
  const parts = token.split("_");
  if (parts.length < 3) return null;
  const prefix = parts[1];
  if (!prefix) return null;

  const hash = sha256Hex(token);

  const record = await prisma.appPassword.findFirst({
    where: { prefix, hash, revokedAt: null },
    select: {
      id: true,
      name: true,
      prefix: true,
      createdAt: true,
      lastUsedAt: true,
      revokedAt: true,
    },
  });

  if (!record) return null;

  // Best-effort telemetry: last used timestamp.
  await prisma.appPassword.update({
    where: { id: record.id },
    data: { lastUsedAt: new Date() },
  });

  return record;
}

