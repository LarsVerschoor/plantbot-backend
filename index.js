const app = require('express')();
const http = require('http');

const server = http.createServer(app);

server.listen(process.env['EXPRESS_PORT'] || 80);