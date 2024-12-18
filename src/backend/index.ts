import express from "express";
import http from "http";
import path from "path";

import { registerConnection } from "./connection";

const app = express();
const server = new http.Server(app);
const io = require("socket.io")(server);
const port = parseInt(process.env.PORT || "3000", 10);

app.use(express.static(path.join(__dirname, "..", "public")));

io.on("connection", registerConnection);

server.listen(port, () =>
  process.stdout.write(`Listening on port ${port}...\n`),
);
