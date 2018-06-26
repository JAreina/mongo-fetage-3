let express = require('express');
let negocioUsuarios = require('../negocio/usuariosNegocio.js');

let router = express.Router();

router.get('/usuarios/credenciales', buscarPorLoginYPassword);
router.get('/usuarios/:id', buscar);
router.get('/usuarios', listar);
router.post('/usuarios', insertar);
router.put('/usuarios/:id', modificar);
router.delete('/usuarios/:id', borrar);

router.get('/logins/:login', comprobarSiElPutoLoginExiste); 

exports.router = router;

/**************************************/
/* Funciones con la lógica de control */
/**************************************/

function buscarPorLoginYPassword(request, response){
    //Al pasar por el interceptor se busca la cabecera authentication 
    //en la peticion, se obtiene de la bb.dd el usuario y se guarda en 
    //el request
    let usuario = request.usuario;
    response.json(usuario);
}

function insertar(request, response){
    let usuario = request.body;
    negocioUsuarios.insertar(usuario)
    .then( rs => {
        response.json(rs);
    })
    .catch( error => {
        response.status(error.status);
        response.json(error);
    });  
}

function modificar(request, response){
    let id = request.params.id;
    let usuarioBody = request.body;
    usuarioBody._id = id;

    negocioUsuarios.modificar(usuarioBody, request.usuario)
    .then( () => {
        response.sendStatus(200);
    })
    .catch( error => {
        response.status(error.status);
        response.json(error);
    });    
}

function borrar(){

}

function buscar(request, response){
    let id = request.params.id;

    negocioUsuarios.buscar(id)
    .then( usuario => {
        //Controlar el 404
        response.json(usuario);
    })
    .catch( error => { 
        console.log(error);
        response.sendStatus(500);
    } );

}

function listar(){

}

function comprobarSiElPutoLoginExiste(request, response){
    let login = request.params.login;
    negocioUsuarios.buscarPorLogin(login)
    .then( usr => response.send( { "login":usr.login } ) )
    .catch( error => {
        response.status(error.status);
        response.json(error);
    });
}


