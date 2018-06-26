var mongoose = require('mongoose');

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

exports.Usuario = mongoose.model("usuarios",esquemaUsuario);