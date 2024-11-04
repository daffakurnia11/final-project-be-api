import { app } from "./app";
import { config } from "./config";
import { createServer } from "http";
import { Server } from "socket.io";

const API_PORT = config.apiPort || 8000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("socketio", io);

server.listen(API_PORT, () => {
  console.log(`Server running in ${config.env} mode on port ${API_PORT}`);
});
