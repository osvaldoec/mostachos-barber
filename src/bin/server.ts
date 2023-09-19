import http from "http";

import app from "../app";
import { config } from "../config";

const port = (function normalizePort(val: string) {
  const portNumber = parseInt(val, 10);

  if (isNaN(portNumber)) {
    // named pipe
    return val;
  }

  if (portNumber >= 0) {
    // port number
    return portNumber;
  }

  console.error("No port number assigned or out of range");
  process.exit(1);
})(config.PORT);

app.set("port", port);
const server = http.createServer(app);

void (async function initServer() {
  try {
    console.debug(`IS_LOCAL: ${config.IS_LOCAL.toString()}`);

    // SERVER
    server.listen(port);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

/**
 * Event listener for HTTP server "error" event.
 */

server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = `${typeof port === "string" ? "Pipe" : "Port"} ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address() || "";
  const typeofAddr = typeof addr === "string";
  const bind = typeofAddr ? `pipe ${port}` : `port ${port}`;

  console.info(`Listening on ${bind}`);

  if (config.IS_LOCAL) {
    console.debug(`Server listening on http://localhost:${port}`);
  }
}
