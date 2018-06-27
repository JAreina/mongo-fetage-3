let Producto = require("../entidades/producto.js").Producto;


exports.insertar = function(producto){

    /*if( typeof producto._id != 'undefined' ){

         return new Promise(function(resolve,reject){
            reject( { status: 400, texto: 'No se puede insertar con _id' });
         })
           
    }*/

    if ( !producto.nombre || producto.nombre.trim()=='' ||
         !producto.descripcion  || producto.descripcion.trim()==''
          ){

            return new Promise(function(resolve,reject){
                reject( { status: 400, texto: 'datos incorrectos' });
             })
            
    }

     producto = new Producto(producto);

    // devuelve promesa 


    return new Promise(function(resolve,reject){
        producto.save()
        .then(
            rs =>{
                resolve( { status: 200, texto:'producto insertado' });
            }
        ).catch(error => { 
            reject({ status: 500, texto: 'Ay mamá',error:error });
        });
    })
   
  
}


exports.listarProductos = ()=>{
return new Promise(function(resolve,reject){
  Producto.find({})
  .then(listados =>{
      resolve({status: 200, productos: listados})
  })
  .catch(error =>{
    reject({ status: 500, texto: 'NO SE HAN LISTADOS PRODUCTO S',error:error });
  })
})
}



exports.listarProductosCategoria = (cat)=>{
    return new Promise(function ( resolve, reject){
        Producto.find({"categoria": cat})
        .then(cat =>{
            resolve({status: 200, productos: cat})
        })
        .catch(error =>{
            reject({ status: 500, texto: 'no hay productos de esa categoria',error:error });
          })
    })
}