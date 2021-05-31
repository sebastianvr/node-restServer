const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const {Usuario} = require('../models');

//Obtener
/* Uso en postman {{url}}/api/usuarios?desde=Number&limite=Number */
const usuariosGet = async (req = request, res = response) => {
    const estado = { estado: true };

    const { limite = 5, desde = 0 } = req.query;

    /* Para que mas de una promesa se ejecute (2 promesas hay aqui) entones uso el Promise.all
        donde funcionara en paralelo por lo tanto menor tiempo de espera 
    */
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(estado),
        Usuario.find(estado)
            .limit(Number(limite))
            .skip(Number(desde)),
    ])

    return res.json({
        total,
        usuarios

    })
}

//Crear
const usuariosPost = async (req, res) => {
    /* En este punto de la ejecucion, req ya ha sido validado en routes */

    //recibo el contenido del body
    const { nombre, correo, password, rol } = req.body

    //lo guardo en mi BD usuarios
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encryptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar BD
    await usuario.save();

    return res.status(201).json({
        msg: "Usuario guardado!",
        usuario
    });
}

//Actualizar
const usuariosPut = async (req, res) => {
    const id = req.params.id
    const { _id, password, google, correo, ...resto } = req.body;

    //actualizar contraseña en BD 
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    //actualizar correo en BD
    if (correo) {
        resto.correo = correo;
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    return res.json({
        msg: 'Usuario actualizado!',
        usuario
    })
}

//Eliminar
const usuariosDelete = async (req, res) => {
    const { id } = req.params
    const estado = { estado: false }

    /* Manera de eliminar por completo de BD
        const usuario = await Usuarios.findByIdAndDelete(id) */

    /* Manera de "eliminar", cambiando el estado a false, seguira en mi BD
        esto es para mantener la interidad referencial */
    const usuario = await Usuario.findByIdAndUpdate(id, estado)

    return res.json({
        msg: 'Usuario Eliminado!',
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}