import { createServer } from "node:http";
import { Server } from "socket.io";
//@ts-ignore
import { createExpressApp } from "./server/index.ts";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

createExpressApp({ dev, hostname, port }).then(({ expressApp }) => {
  const httpServer = createServer(expressApp);

  const io = new Server(httpServer);

  io.on("connection", () => {
    // ...
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
