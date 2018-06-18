const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// mogodb funciones asincoranas

//CONEXION CON  callbacks

const dbName = 'bbdd';

mongo.connect(url, function(err, client) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('connectado a base de datos 1: ' + client.s.options.dbName);

	const base = client.db(dbName);
	let bicis = base.collection('bicicletas');

	/*
                   // CREAR COLECCION               
        base.createCollection("bicicletas", 
                  { "capped": true, "size": 100000, "max": 5000},
                    function(err, results) {
                        console.log("Collection created.");
                        //console.log(results)
                       //client.close();
                    })

         
                    // INSERTAR //////////////////////////
         bicis.insertOne({a: 1,b:2}, (err,r)=>{
                    console.log("INSERTADO ")
                   
         })


                 // INSERTAR MUCHOS  /////////////////////////////
         bicis.insertMany([{c: 55},{d:24}], (err,r)=>{
                    console.log("INSERTADOS MUCHOS")
                   
         })

*/
	// UPDATE ONE
	bicis.updateOne({ d: 24 }, { $set: { b: 888888888 } }, (err, r) => {
		console.log('UPDATE ONE ');
	});

	bicis.findOne({ d: 24 }, (err, r) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(r);
		client.close();
		segundaConexion();
	});
});
//CONEXION CON promesas

function segundaConexion() {
	let conexion = mongo.connect(url);

	console.log(conexion);

	conexion
		.then((db) => {
			console.log('connectado a base de datos 2: ' + db.s.options.dbName);
			const base = db.db(dbName);
			let bicis = base.collection('bicicletas');

            return bicis.findOne({ c: 55 });
            //lo devuelve al siguiente then(datos)
		})
		.then((datos) => {
            console.log(datos);
            return datos;
            
		}).then(datos => console.log(datos))
		.catch((err) => {});
}
