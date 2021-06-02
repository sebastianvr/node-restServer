const { Categoria,
    Role,
    Usuario } = require('../models');

//estos son los middlewares que seran utilizados para validaciones al hacer peticiones en los endpoints

const existeRol = async (rol) => {

    if (!rol) {
        return
    }
    const existe = await Role.findOne({ rol });

    if (!existe) {
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

    if (!id) {
        return
    }

    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El id  ${id}  no existe en la BD`);

    }
}

const esUsuarioEliminado = async (id) => {
    const usuarioEliminado = await Usuario.findById(id).where({ estado: false });
    if (usuarioEliminado) {
        throw new Error(`El id  ${id}  esta eliminado en la BD`);

    }
}
const existeCategoriaPorId = async (id) => {

    if (!id) {
        return;
    }

    const existeCat = await Categoria.findById(id);
    if (!existeCat) {
        throw new Error(`id ${id} no existe en BD`);
    }

}

const isCategoriaEliminada = async (id) => {
    const catEliminada = await Categoria.findById(id).where({ estado: false });
    if (catEliminada) {
        throw new Error(`El id  ${id}  esta eliminado en la BD`);

    }
}

const existeCategoria = async (nombre = '') => {
    nombre = nombre.toUpperCase();
    const existeNombre = await Categoria.findOne({ nombre });
    if (existeNombre) {
        throw new Error(`Este nombre: ${nombre} ya esta registrado`);
    }
}

module.exports = {
    existeRol,
    existeEmail,
    existeUsuarioPorId,
    esUsuarioEliminado,
    isCategoriaEliminada,
    existeCategoriaPorId,
    existeCategoria
    
}