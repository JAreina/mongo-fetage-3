let mongo = require("mongodb");

let url = "mongodb://localhost:27017";
let esquema = "bbdd";
let conexion = null;

exports.conectar = function(){

    return new Promise( function(resolve, reject){
        
        if( conexion != null ){
            resolve(conexion);
            return;
        }
        
        mongo.connect(url)
        .then( bd => { 
            conexion=bd;
            resolve(conexion);
        })
        .catch( error => { reject(error) });
    } );

}

exports.getConexion = function(){
    return conexion.db(esquema);
}
