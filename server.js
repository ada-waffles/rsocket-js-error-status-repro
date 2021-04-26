const {RSocketServer} = require("rsocket-core");
const {default: RSocketWebSocketServerTransport} = require("rsocket-websocket-server");

const server = new RSocketServer({
    transport: new RSocketWebSocketServerTransport({
        host: "localhost",
        port: 4242
    }),
    getRequestHandler() {
        console.log("Connection received... Rejecting...");
        throw new Error("Setup rejected");
    }
});

console.log("Starting server...");
server.start();
