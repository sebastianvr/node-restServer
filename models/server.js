//express es un modulo que permite facilmente crear un servidor de contenido
const express = require('express');

//cors es el intercambio de recursos de origen cruzado
const cors = require('cors');

//modulo para carga de archivos 
const fileUpload = require('express-fileupload');

//importo la configuracion de mongo db
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth'
        this.paths = {

            auth : '/api/auth',
            busquedas: '/api/busquedas',
            categorias : '/api/categorias',
            productos : '/api/productos',
            usuarios : '/api/usuarios',
            uploads : '/api/uploads',
        }

        //conectar a la base de datos
        this.conectarDB();

        //middlewares: so funcioens que añaden otra funcionalidad al web server
        this.middlewares();

        //rutas de mi app
        this.routes();


    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        //se usa la palabra clave use, para indicar que son middlewares
        //CORS: sirve para dar acceso o restringir el API desde remoto
        this.app.use(cors());

        //Se utiliza para la lectura y parseo del body
        //Ej: cuando realizo un post desde postman en formato JSON.
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'))

        //fileupleads - carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true , 
            tempFileDir : '/tmp/',
            createParentPath : true 
        }));
    }

    routes() {
        
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.busquedas, require('../routes/busquedas.routes'));
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use(this.paths.productos, require('../routes/producto.routes'));
        this.app.use(this.paths.usuarios, require('../routes/user.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }
}

module.exports = Server;