const bcryptjs = require('bcryptjs');
const { response, request } = require("express");

const { createJWT } = require('../helpers/create-jwt');
const Usuarios = require("../models/usuario");


const login = async (req = request, res = response) => {
    const { correo, password } = req.body
    try {
        //verificar si email existe en BD
        const usuario = await Usuarios.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msj: "No existe este correo en la BD"
            });
        }

        //verificar si el usuario esta activo en BD
        if (!usuario.estado) {
            return res.status(400).json({
                msj: "Este usuario fue eliminado de la BD"
            });
        }

        //validar contraseña con la BD
        const validaPass = bcryptjs.compareSync(password, usuario.password);
        if (!validaPass) {
            return res.status(400).json({
                msj: "Contraseña incorrecta"
            });
        }

        //gererar JWT
        /* En el payload solo guardo mi id de usuario */
        const token = await createJWT(usuario.id);
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msj: "Error hable con el administrador"
        })
    }
}

module.exports = {
    login
}