const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const { User, Plantbot } = require('./database/models');

// Routers
const router = require('./routers/index');

const app = express()
const server = http.createServer(app);

const wss = new WebSocket.Server({ noServer: true });
wss.on('connection', (ws, res) => {
    console.log('New WebSocket connection');
    ws.on('message', async (message) => {
        const { event, payload } = JSON.parse(message);
        console.log(`event: ${event}, payload: ${payload}`);

        if (event === 'register') {
            const user = await User.findOne({ where: { email: payload } });
            if (!user) {
                return ws.send('register:fail');
            }
            const newPlantbot = await Plantbot.create({
                user_id: user.id
            });
            return ws.send(`register:success:${newPlantbot.id}`);
        }
    });
    ws.send('Connection established');
});

server.on('upgrade', (req, socket, head) => {
    if (req.url === '/iot') {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit('connection', ws, req);
        })
    }
});
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

server.listen(process.env['EXPRESS_PORT'] || 80);