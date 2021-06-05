const { response } = require('express');
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
//autenticacion de backend
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require('../helpers/subir-archivo');
const { Usuario, Producto } = require('../models');
const { model } = require('mongoose');

const postArchivo = async (req, res = response) => {
    //const extencionesPermitidas = ['png', 'jpg', 'svg', 'gif'];

    try {
        const data = await subirArchivo(req.files, ['png', 'jpg', 'svg', 'gif'], 'imagenes');
        return res.status(200).json({
            nombre: data
        });

    } catch (error) {
        return res.status(400).json({
            error
        });
    }


}

const actualizarImagen = async (req, res = response) => {
    const { coleccion, id } = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe este id de usuario '
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe este id de producto'
                });
            }
            break;

        default:
            return res.status(500).json({
                msg: 'Error al validar en el servidor llame al back dev pls'
            });
    }

    //Limpiar imagenes previas 
    if (modelo.imagen) {
        //eliminar imagen del servidor, para trabajar con archivos y carpetas utilizo fs y path
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }
    try {


        const nombre = await subirArchivo(req.files, ['jpeg', 'png', 'gif', 'jpg'], coleccion);
        modelo.imagen = nombre;
        await modelo.save();
        return res.status(200).json({
            modelo
        })

    } catch (error) {
        return res.status(400).json({
            error
        })
    }

}

const actualizarImagenCloudinary = async (req, res = response) => {
    const { coleccion, id } = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe este id de usuario '
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe este id de producto'
                });
            }
            break;

        default:
            return res.status(500).json({
                msg: 'Error al validar en el servidor llame al back dev pls'
            });
    }

    //Limpiar imagenes previas 
    if (modelo.imagen) {
        let separarURL = modelo.imagen.split('/');
        separarURL = separarURL[separarURL.length - 1];
        const [public_id] = separarURL.split('.');
        cloudinary.uploader.destroy(public_id);
    }   

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.imagen = secure_url;
    await modelo.save();
    return res.status(200).json(modelo);


}

const obtenerImagen = async (req, res = response) => {
    const { coleccion, id } = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe este id de usuario '
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe este id de producto'
                });
            }
            break;

        default:
            return res.status(500).json({
                msg: 'Error al validar en el servidor llame al back dev pls'
            });
    }

    //Limpiar imagenes previas 
    if (modelo.imagen) {
        //eliminar imagen del servidor, para trabajar con archivos y carpetas utilizo fs y path
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    } else {
        const pathPlaceHolder = path.join(__dirname, '../assets/no-image.jpg');
        if (fs.existsSync(pathPlaceHolder)) {
            return res.sendFile(pathPlaceHolder);
        }

    }

    // res.json({
    //     msg: 'Falta placeholder'
    // })
}
module.exports = {
    postArchivo,
    actualizarImagen,
    obtenerImagen,
    actualizarImagenCloudinary
}

