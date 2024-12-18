import normalizePort from "@fvilers/normalize-port";
import express from "express";
import { createServer } from "node:http";
import path from "path";
import { Server } from "socket.io";

import { registerClient } from "./client";

const app = express();
const port = normalizePort(process.env.PORT || "3000");
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "..", "public")));

io.on("connection", registerClient);

server.listen(port, () =>
  process.stdout.write(`Listening on port ${port}...\n`),
);
