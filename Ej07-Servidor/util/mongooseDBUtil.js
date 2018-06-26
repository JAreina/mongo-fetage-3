var mongoose = require('mongoose');



mongoose.Promise = global.Promise;



exports.conectar = function(){
   return  new Promise(
       function(resolve,reject){
        mongoose.connect('mongodb://localhost:27017/mongoose')
        .then(conn =>{
             resolve(conn)
        })
        .catch(error=>{
               reject("no hubo conexion")
        })
       }
   )
}



