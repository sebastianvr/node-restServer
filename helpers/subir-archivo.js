const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = async (files, extencionesPermitidas, nombreCarpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        //en caso que los nombres vengan con puntos  Ex: mi.archivo.png
        const nombreArchivoCortado = archivo.name.split('.');
        const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];

        if (!extencionesPermitidas.includes(extension)) {
            return reject(`Esta extension: ${extension} no esta permitida`);
        }
        //renombro mi archivo con un id unico del paquete uuidv4 
        const nombreTemporal = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', nombreCarpeta, nombreTemporal);

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, function (err) {
            if (err) {
                return reject(`Error al subir archivo ${err}`);
            }
            
            return resolve(nombreTemporal);
            
        });
    });
}

module.exports = {
    subirArchivo
}