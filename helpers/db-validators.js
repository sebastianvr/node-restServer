const { Categoria,
    Role,
    Usuario,
    Producto } = require('../models');

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
    const existeCat = await Categoria.findById(id);
    if (!existeCat) {
        throw new Error(`La categoria no existe en BD`);
    }

}

const isCategoriaEliminada = async (categoria) => {
    const catEliminada = await Categoria.findById(categoria).where({ estado: false });
   
    //si el resutado de la consulta es null, indica que no hay caategoria con ese id en estado false
    if(!catEliminada){
        return;
    }
    if (!catEliminada.estado) {
        throw new Error(`Esta categoria esta eliminada en la BD`);

    }
    return
}

const existeCategoria = async (nombre = '') => {
    nombre = nombre.toUpperCase();
    const existeNombre = await Categoria.findOne({ nombre });
    if (existeNombre) {
        throw new Error(`Este nombre: ${nombre} ya esta registrado`);
    }
}

const existeProductoByNombre = async (nombre = '') => {
    nombre = nombre.toUpperCase();
    const existeNombre = await Producto.findOne({ nombre });
    if (existeNombre) {
        throw new Error(`Este nombre: ${nombre} ya esta registrado`);
    }
}
const existeProductoPorId = async (id) => {
    const existeProd = await Producto.findById(id);
    if (!existeProd) {
        throw new Error(`El producto no existe en BD`);
    }

}

const esProductoEliminado = async (id) => {
    //console.log(id);
    const productoEliminado = await Producto.findById(id);

    if(!productoEliminado){
        return;
    }
    if (!productoEliminado.estado) {
        throw new Error(`El producto esta eliminado en la BD`);

    }
}

module.exports = {
    existeRol,
    existeEmail,
    existeUsuarioPorId,
    esUsuarioEliminado,
    isCategoriaEliminada,
    existeCategoriaPorId,
    existeCategoria,
    existeProductoPorId,
    existeProductoByNombre,
    esProductoEliminado

}