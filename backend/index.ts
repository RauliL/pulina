import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as socketIO from 'socket.io';

import { registerConnection } from './connection';

const app = express();
const server = new http.Server(app);
const io = socketIO(server);
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.static(path.join(__dirname, '..', 'public')));

io.on('connection', registerConnection);

server.listen(
  port,
  () => process.stdout.write(`Listening on port ${port}...\n`),
);
