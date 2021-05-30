const { request, response } = require("express");

const { Categoria } = require("../models");

/* Obtener una categorias - PUBLICO */
const categoriaGet = (req= request, res= response)=>{
    const {id} = req.params;
    return res.json({
        msg: 'todo ok categorias get',
        id
    });
}

/* Obtener todas las categorias - PUBLICO */
const categoriaGetAll = (req= request, res= response)=>{
    return res.json({
        msg: 'Categorias GetAll'
    });
}

/* Crear una categoria PRIVADO solo usuarios con token valido */
const categoriaPost = async (req= request, res= response)=>{
    const nombre  = req.body.nombre.toUpperCase();
    
    const existeNombre = await Categoria.findOne({nombre});

    if(existeNombre){
        return res.status(400).json({
            msg : 'Este producto ya esta en la BD'
        })
    }
    
    const data = {
        nombre, 
        usuario : req.usuario._id
    }
    
    const categoria = new Categoria(data);
    
    await categoria.save();
    
    return res.json({
        msg: 'Categorias Post',
        categoria
    });
}

/* Actualizar una categoria PRIVADO solo usuarios con token valido */
const categoriaPut = (req= request, res= response)=>{
    return res.json({
        msg: 'Categorias Put'
    });
}

/* Eliminar una categoria PRIVADO solo usuarios con rol ADMIN */
const categoriaDelete = (req= request, res= response)=>{
    return res.json({
        msg: 'Categorias Delete'
    });
}

module.exports = {
    categoriaGet,
    categoriaGetAll,
    categoriaPost,
    categoriaPut,
    categoriaDelete
} 