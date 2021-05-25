const Role = require('../models/role')
const Usuarios = require('../models/usuario')

//estos son los middlewares que seran utilizados para validaciones al hacer peticiones en los endpoints

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
 
    if (!existeRol) {
        throw new Error(`El rol: ${rol} no existe en la BD`);
    }
}

const existeEmail = async (correo = '') => {
    const existeEmail = await Usuarios.findOne({ correo });
    if (existeEmail) {
        throw new Error(`Este correo: ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existeId = await Usuarios.findById(id);
    if (!existeId) {
        throw new Error(`El id  ${id}  no existe en la BD`);
        
    }
}

const isUsarioEliminado = async (id) =>{
    const usuarioEliminado = await Usuarios.findById(id).where({estado:false});
    if (usuarioEliminado) {
        throw new Error(`El id  ${id}  esta eliminado en la BD`);
        
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    isUsarioEliminado
}