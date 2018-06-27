var mongoose = require('mongoose');

// definir esquema
let Esquema = mongoose.Schema;
let esquemaProducto = new Esquema({
    //_id: Esquema.Types.ObjectId,
    codigo: String,
    nombre :String,
    descripcion: String,
    precio: Number,
    imagen: String,
    categoria: String
})

// obtener modelo

exports.Producto= mongoose.model("productos",esquemaProducto);