const { request, response } = require("express");


const esAdminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se requiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `Usuario ${nombre} no esta autorizado para eliminar `
        })
    }

    next();
}

const tieneRole = (...roles) => { 
    return ((req = request, res = response, next) => {
        
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se requiere verificar el role sin validar el token primero'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg : 'El rol de este usuario no esta autorizado a eliminar'
            })
        }
        next();
    });
}

module.exports = {
    esAdminRole,
    tieneRole
}