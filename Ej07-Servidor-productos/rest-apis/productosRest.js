let express = require('express');
let negocioProductos = require('../negocio/productosNegocio.js');

let router = express.Router();


router.post('/producto', insertar)
       .get('/productos',listarProductos)
       .get('/productos/categorias/:cat',listarProductosCategoria)






exports.router = router;
/**
 * logica de control
 * 
 * 
 */

function insertar(request, response){
    let producto = request.body;
    negocioProductos.insertar(producto)
    .then( rs => {
        response.json(rs);
    })
    .catch( error => {
        response.status(error.status);
        response.json(error);
    });  
}

function listarProductos(request,response){
    negocioProductos.listarProductos()
    .then(lista=>{
        response.json(lista);
    })
    .catch(error=>{
        response.status(error.status);
        response.json(error);
    })

}

function listarProductosCategoria(request, response){
    let cat = request.params.cat;
    negocioProductos.listarProductosCategoria(cat)
    .then(cat =>{
              response.json(cat)
    })
    .catch(error=>{
        response.status(error.status);
        response.json(error);
    })

}