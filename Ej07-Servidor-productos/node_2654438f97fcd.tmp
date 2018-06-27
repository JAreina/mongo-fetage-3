let express = require('express');
let bodyParser = require('body-parser');
let usuariosRest = require('./rest-apis/usuariosRest.js');
let mongoDBUtil = require("./util/mongoDBUtil.js");
let authUtil = require("./util/autenticacionUtil");
let atob = require("atob");

//Lo primero que hacemos es la llamada a conectar
mongoDBUtil.conectar();

let app = express();

app.disable('x-powered-by');

//Interceptor:
app.use(function( request, response, next){
    console.log("Petición recibida:"+request.path);
    
    //Para el cross origin:
    //Incluye configuración para BASIC AUTHENTICATION
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    console.log("METODO:"+request.method);
    if( request.method == 'OPTIONS'){
        next();
        return;
    }

    authUtil.basicAuthentication(request, response)
    .then( usuario => {
        //guardamos el usuario en el request
        request.usuario = usuario; 
        next(); //tira pa'lante
    })
    .catch( error => {
        response.sendStatus(403);
    });

});

app.use(bodyParser.json());
app.use('/', usuariosRest.router);

app.listen(8000, function(){ 
    console.log('Esperando peticiones...');
});

