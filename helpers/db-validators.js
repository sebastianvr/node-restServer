const Role = require('../models/role')
const Usuarios = require('../models/usuario')

//estos son los middlewares que seran utilizados para validaciones al hacer peticiones en los endpoints
const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    console.log(existeRol)

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
        throw new Error(`Este id: ${id} no existe`); 
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}