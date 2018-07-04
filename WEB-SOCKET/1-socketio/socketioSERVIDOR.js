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
     
           socket.enviarAviso = function(){
               console.log(this)
               this.emit("escribe algo", "escribe algo");
           }


           let idTimer = setTimeout(socket.enviarAviso,1000);

        console.log("cliente conectado::::::: "+ socket.id);
         
        socket.on('identificador', identificador =>{
            socket.idd = identificador;
            if(identificador)
            console.log(socket.id +" ............."+identificador)
        })
        socket.on('mensaje', mensaje =>{
            console.log(socket.id +" ............."+mensaje)
              

            // reenviar a todos los sockets  con io 
            io.emit('mensajes',{id: socket.idd, mensaje: mensaje, 
                hora: `${new Date().toTimeString()}`})
        })


        socket.on('disconnect', desconectado =>{
            console.log(socket.idd + ":  "  +desconectado)
        })
  });

 