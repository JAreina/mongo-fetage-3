let http = require('http');
const express = require('express');
const socketio = require('socket.io');

let app = express();
let server = http.createServer(app);
let io = socketio(server);

app.use(express.static("./recursosestaticos"))

server.listen(23999, ()=>
  console.log("espero conexiones http://localhost:23999"));


  io.on("connection",(socket)=>{
        console.log("cliente conectado::::::: "+ socket.id);
         
        socket.on('identificador', identificador =>{
            console.log(socket.id +" ............."+identificador)
        })

  });

 