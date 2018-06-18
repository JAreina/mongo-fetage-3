const mongo = require('mongodb');
const url = "mongodb://localhost:27017/bbdd";

// mogodb funciones asincoranas 


//CONEXION CON  callbacks


/*
mongo.connect(url, function(err,db){
    
    if(err){
        console.log(err);
        return;
    }
    console.log("connectado a base de datos : "+db.s.options.dbName);
    
 
});*/
//CONEXION CON promesas


let conexion = mongo.connect(url);

console.log(conexion);

conexion
.then(
    (db)=>{
        console.log("connectado a base de datos : "+db.s.options.dbName);
    }
)
.catch((err)=>{
    
});