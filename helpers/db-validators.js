const { Categoria,
    Role,
    Usuario } = require('../models');

//estos son los middlewares que seran utilizados para validaciones al hacer peticiones en los endpoints

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol: ${rol} no existe en la BD`);
    }
}

const existeEmail = async (correo = '') => {
        const existeEmail = await Usuario.findOne({ correo });
        if (existeEmail) {
            throw new Error(`Este correo: ${correo} ya esta registrado`);
        }
}

const existeUsuarioPorId = async (id) => {
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El id  ${id}  no existe en la BD`);

    }
}

const isUsarioEliminado = async (id) => {
    const usuarioEliminado = await Usuario.findById(id).where({ estado: false });
    if (usuarioEliminado) {
        throw new Error(`El id  ${id}  esta eliminado en la BD`);

    }
}
const existeCategoriaPorId = async (id) => {
    const existeCat = await Categoria.findById(id);
   
    if (!existeCat) {
        console.log(`id ${id} no existe en BD`);
    }
  
}

const isCategoriaEliminada = async (id) => {
    const catEliminada = await Categoria.findById(id).where({ estado: false });
    if (catEliminada) {
        throw new Error(`El id  ${id}  esta eliminado en la BD`);

    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    isUsarioEliminado,
    isCategoriaEliminada,
    existeCategoriaPorId
}