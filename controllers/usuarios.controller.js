const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuarios = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    const estado = {estado: true};
    const { limite = 5, desde = 0 } = req.query;

    //envio una condicion dentro del find
    // const usuarios = await Usuarios.find(estado)
    //     .limit(Number(limite))
    //     .skip(Number(desde))

    //envio una condicion dentro del countDocuments
    //const total = await Usuarios.countDocuments(estado)    


    const [total, usuarios] = await Promise.all([
        Usuarios.countDocuments(estado),
        Usuarios.find(estado)
            .limit(Number(limite))
            .skip(Number(desde)),
        

    ])
    res.json({
        total,
        usuarios

    })
}

const usuariosPost = async (req, res) => {
    
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuarios({ nombre, correo, password, rol });

    //encryptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar BD
    await usuario.save();
    
    res.status(201);
    res.json({
        msg: "Datos guardados en la BD",
        usuario
    })
}

//actualizar
const usuariosPut = async (req, res) => {
    const id = req.params.id
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra BD

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuarios.findByIdAndUpdate(id, resto);

    res.json(usuario)
}

const usuariosDelete = async (req, res) => {
    const {id} = req.params
   const estado = {estado: false}
    //manera de eliminar por completo de BD
    //const usuario = await Usuarios.findByIdAndDelete(id)

    //manera de "eliminar", cambiando el estado a false
    const usuario = await Usuarios.findByIdAndUpdate(id, estado)
    res.json(usuario)
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete

}