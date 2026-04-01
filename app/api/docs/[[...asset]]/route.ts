import { readFile } from "node:fs/promises";
import path from "node:path";
import swaggerUiDist from "swagger-ui-dist";

const baseDir = swaggerUiDist.getAbsoluteFSPath();

function contentType(filename: string): string {
  if (filename.endsWith(".css")) return "text/css; charset=utf-8";
  if (filename.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filename.endsWith(".map")) return "application/json; charset=utf-8";
  if (filename.endsWith(".png")) return "image/png";
  if (filename.endsWith(".svg")) return "image/svg+xml";
  if (filename.endsWith(".html")) return "text/html; charset=utf-8";
  return "application/octet-stream";
}

function safeJoin(base: string, requested: string): string | null {
  const normalized = requested.replaceAll("\\", "/");
  if (normalized.includes("..")) return null;
  const full = path.join(base, normalized);
  const resolvedBase = path.resolve(base) + path.sep;
  const resolvedFull = path.resolve(full);
  if (!resolvedFull.startsWith(resolvedBase)) return null;
  return resolvedFull;
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ asset?: string[] }> },
) {
  const { asset } = await ctx.params;

  if (!asset || asset.length === 0) {
    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>API Docs</title>
    <link rel="stylesheet" href="/api/docs/swagger-ui.css" />
    <style>
      html, body { height: 100%; margin: 0; }
      #swagger-ui { height: 100%; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="/api/docs/swagger-ui-bundle.js"></script>
    <script src="/api/docs/swagger-ui-standalone-preset.js"></script>
    <script>
      window.ui = SwaggerUIBundle({
        url: "/api/openapi",
        dom_id: "#swagger-ui",
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        layout: "StandaloneLayout"
      });
    </script>
  </body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  const requested = asset.join("/");
  const fullPath = safeJoin(baseDir, requested);
  if (!fullPath) return new Response("Not found", { status: 404 });

  try {
    const data = await readFile(fullPath);
    return new Response(data, {
      status: 200,
      headers: { "content-type": contentType(fullPath) },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

