let http = require('http');
const express = require('express');
const socketio = require('socket.io');

let app = express();
let server = http.createServer(app);
let io = socketio(server);


server.listen(23999, ()=>console.log("espero conexiones"));
