const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT =  async (req= request, res = response, next) =>{
    const token  = req.header('x-token');
    if (!token){
        return res.status(401).json({
            msg : 'No se encuentra el token',
        });
    }
    try {
        /* verify(token del ciente, clave de la firma) retorna el payload */
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //leer en BD el usuario con el uid
        const usuario = await Usuario.findById(uid);
        
        if(!usuario){
            return res.status(401).json({
                msg : 'Usuario no existe en la BD',
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'No se encuentra token, usuario estado: false'
            });
        }
        req.usuario=usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg : 'Token inválido'
        })
    }
    
};


module.exports = {
    validarJWT
}

