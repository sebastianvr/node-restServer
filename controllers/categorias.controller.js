const { request, response } = require("express");

const { Categoria } = require("../models");

//TODO: obtener categorias - paginado - cantidad de documentos - populate?
// obtener categoria por id - populate
// actualizar categoria
//borrar categoria - cambiando estado

/* Obtener una categorias - PUBLICO */
const categoriaGet = async (req = request, res = response) => {
    const { id } = req.params;
    
    const categoria = await Categoria.findById(id).populate('usuario','nombre');

    return res.status(201).json({
        categoria
    });

}

/* Obtener todas las categorias - PUBLICO */
const categoriaGetAll = async (req = request, res = response) => {
    const estado = { estado: true };
    const { limite = 5, desde = 0 } = req.query;

    const [total, categoria] = await Promise.all([
        Categoria.countDocuments(estado),
        Categoria.find(estado)
            .populate('usuario','nombre')
            .limit(Number(limite))
            .skip(Number(desde)),
    ])

    return res.status(200).json({
        total,
        categoria

    });
}

/* Crear una categoria PRIVADO solo usuarios con token valido */
const categoriaPost = async (req = request, res = response) => {

    /* Obtengo el nombre y transformo a mayusculas para hacer match mas facil*/
    const nombre = req.body.nombre.toUpperCase();

    const existeNombre = await Categoria.findOne({ nombre });

    if (existeNombre) {
        return res.status(200).json({
            msg: 'Este producto ya esta en la BD'
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    return res.status(201).json({
        msg: 'Categoria guardada!',
        categoria
    });
}

/* Actualizar una categoria PRIVADO solo usuarios con token valido */
const categoriaPut = async (req = request, res = response) => {
    const {id} = req.params;
    const nombre = req.body.nombre.toUpperCase();
    
    categoria = await Categoria.findByIdAndUpdate(id, {nombre}, {new: true}).populate('usuario','nombre');
  
    return res.status(200).json({
        msg: 'Categoria actualizada!',
        categoria

    });
}

/* Eliminar una categoria PRIVADO solo usuarios con rol ADMIN */
const categoriaDelete = async (req = request, res = response) => {
    const {id} = req.params;

    const estado = {estado:false};
    const categoria = await Categoria.findByIdAndUpdate(id, estado, {new: true});

    return res.status(201).json({
        msg: 'Categorias Delete',
        categoria
    });
}

module.exports = {
    categoriaGet,
    categoriaGetAll,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}