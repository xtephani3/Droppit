import express, { type Express } from "express";
import next from "next";

type CreateExpressAppOptions = {
  dev: boolean;
  hostname: string;
  port: number;
};

export async function createExpressApp({
  dev,
  hostname,
  port,
}: CreateExpressAppOptions): Promise<{ expressApp: Express }> {
  // When using middleware, `hostname` + `port` must be provided.
  const nextApp = next({ dev, hostname, port });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  const expressApp = express();

  // Let Next.js handle all routes (including assets and API routes).
  // Express v5 (path-to-regexp v7) does not accept "*" string patterns.
  expressApp.all(/.*/, (req, res) => handle(req, res));

  return { expressApp };
}
