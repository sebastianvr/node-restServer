const bcryptjs = require('bcryptjs');
const { response, request } = require("express");

const { createJWT } = require('../helpers/create-jwt');
const Usuario = require("../models/usuario");

const { googleVerify } = require('../helpers/google-validators')

const login = async (req = request, res = response) => {
    const { correo, password } = req.body
    try {
        //verificar si email existe en BD
        const usuario = await Usuario.findOne({ correo });
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

const googleSignIn = async (req = request, res = response) => {
    const {id_token} = req.body;   

    try {

        const {correo, imagen, nombre} = await googleVerify(id_token)
        
        let usuario = await Usuario .findOne({correo});
        
        //correo registrado
        if(usuario && !usuario.estado){
            return res.status(401).json({
                msg: 'Este usuario esta bloqueado, hable con admin'
            });
        }

        if(usuario){
            return res.status(401).json({
                msg: 'Este usuario ya existe en BD'
            });
        }

        //correo no esta registrado, registrarme
        if(!usuario){    
            const data = {
                nombre,
                correo, 
                imagen,
                password : ':P', 
                google: true,
            };
            
            usuario = new Usuario(data);
            await usuario.save(); 

        }

        //generar un JWT
        const token = await createJWT(usuario.id);
        res.json({
            usuario,
            token
        })  
        
    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es reconocido '
        })
    }
}

module.exports = {
    login,
    googleSignIn
}