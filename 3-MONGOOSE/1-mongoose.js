

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
usuario.nombre = "Juan";
usuario.pw = "xxx";

// save devuelve promesa o se pasa un callback
usuario.save()
console.log(usuario)


