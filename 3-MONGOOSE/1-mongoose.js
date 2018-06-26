

var mongoose = require('mongoose');



mongoose.Promise = global.Promise;


let promesa = mongoose.connect('mongodb://localhost:27017/mongoose');

promesa.then(conn =>{
       console.error("then")
}).catch(
    error =>{
        console.error("catch")
    }

)
console.log("final");


// definir esquema
let Esquema = mongoose.Schema;
let esquemaUsuario = new Esquema({
    _id: Esquema.Types.ObjectId,
    nombre: String,
    login :String,
    pw: String,
    mail: String,
    direccion: String,
    telefono: String,
    idioma: String
})

// obtener modelo

let Usuario = mongoose.model("usuarios",esquemaUsuario);

let usuario = new Usuario()

usuario._id= new mongoose.Types.ObjectId;
usuario.nombre = "aaaaJuandddd";
usuario.pw = "xxxbbbbbaaaaa";

// save devuelve promesa o se pasa un callback
usuario.save()
console.log(usuario)




let insertar = function(usuario){

    if( typeof usuario._id != 'undefined' ){

         return new Promise(function(resolve,reject){
            reject( { status: 400, texto: 'No se puede insertar con _id' });
         })
           
    }

    if ( !usuario.nombre || usuario.nombre.trim()=='' ||
         !usuario.login  || usuario.login.trim()==''  ||
         !usuario.pw     || usuario.pw.trim()=='' ){

            return new Promise(function(resolve,reject){
                reject( { status: 400, texto: 'datos incorrectos' });
             })
            
    }

    let user = new Usuario(usuario);

    // devuelve promesa 


    return new Promise(function(resolve,reject){
        user.save()
        .then(
            rs =>{
                resolve( { status: 200, texto:'Usuario insertado' });
            }
        ).catch(error => { 
            reject({ status: 500, texto: 'Ay mamá' });
        });
    })
   
   /* let promesa = new Promise( function( resolve, reject ){
        
        if( typeof usuario._id != 'undefined' ){
            reject( { status: 400, texto: 'No se puede insertar con _id' });
            return;            
        }

        if ( !usuario.nombre || usuario.nombre.trim()=='' ||
             !usuario.login  || usuario.login.trim()==''  ||
             !usuario.pw     || usuario.pw.trim()=='' ){
            reject( { status: 400, texto: 'datos incorrectos' });
            return;       
        }

        let bbdd = mongoDBUtil.getConexion();
        bbdd.collection("usuarios").insertOne(usuario)
        .then( rs => { 
            resolve( { status: 200, texto:'Usuario insertado' });
        } )
        .catch( error => { 
            reject({ status: 500, texto: 'Ay mamá' });
        } );
    });    
    return promesa;

    //si peta de verdad: 500

    //si todo va bien: 200, Usuario insertado
*/
}

insertar(usuario).then(ok => console.log("insertado")).catch(err => console.log(err))