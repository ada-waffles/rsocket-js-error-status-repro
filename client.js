const {MESSAGE_RSOCKET_COMPOSITE_METADATA, RSocketClient, TEXT_PLAIN} = require("rsocket-core");
const {default: RSocketWebSocketClient} = require("rsocket-websocket-client");
const WebSocket = require("ws");

const client = new RSocketClient({
    transport: new RSocketWebSocketClient({
        url: "ws://localhost:4242",
        wsCreator: url => new WebSocket(url)
    }),
    setup: {
        keepAlive: 60000,
        lifetime: 180000,
        metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
        dataMimeType: TEXT_PLAIN.string
    }
});

console.log("Attempting to connect to server...");
client.connect().then(
    rsocket => {
        console.log("Initial connection established. SETUP frame sent.");
        rsocket.connectionStatus().subscribe(status => console.log("Connection status:", status));
    },
    err => console.error(`Error establishing initial connection: ${err}`)
);
