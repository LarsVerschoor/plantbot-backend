const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const { User, Plantbot } = require('./database/models');

// Routers
const router = require('./routers/index');

const allowedOrigins = [
    'https://plantbot.nl',
    'http://localhost:5173'
];

const app = express()
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
wss.on('connection', (socket) => {
    console.log('New WebSocket connection');
    socket.send('Hello from server')

    socket.on('message', async (message) => {
        console.log('message');
        console.log(JSON.parse(message));
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    })
});

app.use(cors({
    origin: function(origin, callback) {
        console.log(origin);
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    }
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

server.listen(process.env['EXPRESS_PORT'] || 80);