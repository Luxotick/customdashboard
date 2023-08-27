var {
    WebSocketServer
} = require('ws');

const wss = new WebSocketServer({
    port: 8080
});


const ntClient = require('wolfbyte-networktables');

const client = new ntClient.Client()

wss.once("listening", () => {
    client.start((isConnected, err) => {

    }, 'localhost');

    client.setReconnectDelay(1000);
})


wss.on('connection', async function connection(ws) {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setInterval(async () => {
        if(client.isConnected()) {
            ws.send(JSON.stringify({
                networkTables: "Connected"
            }));
        }else {
            ws.send(JSON.stringify({
                networkTables: "Not Connected"
            }));
        }
    }, 1000)

    ws.on('error', console.error);

    client.addListener((key, val, type, id) => {
        console.log(key, val, type, id)
        if (key.includes("/Besiktas")) {
            ws.send(JSON.stringify({
                networkTables: "Connected"
            }));
            ws.send(JSON.stringify({
                key: key,
                value: val
            }))
        }
        
    })

    ws.send(JSON.stringify({
        networkTables: "Not Connected"
        }));
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

})