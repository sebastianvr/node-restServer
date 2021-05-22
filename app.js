//archivo principal, iniciador de todo el contenido, archivos, carpetas, codigos
//las importaciones de terceros siempre van al inicio, tienen mas importancia

//doenv es un modulo qe permite usar variables de entorno, usando archivo .env
require('dotenv').config();

//llamo archivo de la ruta para iniciar servidor
const Server = require('./models/server');
 
//instancio un objeto de la clase Server
const server = new Server();
//llamo el metodo listen, de clase Server
server.listen();