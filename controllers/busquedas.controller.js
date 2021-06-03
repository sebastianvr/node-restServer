const { response } = require("express")
const { ObjectId } = require("mongoose").Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'categorias',
    'roles',
    'productos',
    'usuarios',
]

const buscarPorUsuario = async (elemento = '') => {
    /* Para buscar por usuario hay dos maneras colocado su id, o colocando el nombre en la busqueda */
    /* EJEMPLO :   {{url}}/api/usuarios/test1   - {{url}}/api/usuarios/607baba40e301e0d96225c4d */

    //comprobar si viene un mongoId o un nombre de usuario
    const isMongoId = ObjectId.isValid(elemento);
    let usuario;

    //console.log(er.test());
    if (isMongoId) {
        usuario = await Usuario.findById(elemento);
        return usuario ? [usuario] : [];
    }

    //expresion regular para hacer insensible a las mayusculas y minusculas
    const er = new RegExp(elemento, 'i');

    //TOOD: promesa en cadena una para find otra para count
    usuario = await Usuario.find({
        $or: [{ nombre: er }, { correo: er }],
        $and: [{ estado: true }]
    });
    return usuario ? [usuario] : [];


}

const buscarPorCategoria = async (elemento = '') => {
    const isMongoId = ObjectId.isValid(elemento);
    let categoria;

    if (isMongoId) {
        categoria = await Categoria.findById(elemento);
        return categoria ? [categoria] : [];
    }

    const er = new RegExp(elemento, 'i');
    categoria = await Categoria.find({
        $and: [{ nombre: er }, { estado: true }]
    });
    return categoria ? [categoria] : [];
};

const buscarPorProducto = async (elemento = '') => {
    const isMongoId = ObjectId.isValid(elemento);
    let producto;

    if (isMongoId) {
        producto = await Producto.findById(elemento);
        return producto ? [producto] : [];
    }

    const er = new RegExp(elemento, 'i');
    producto = await Producto.find({
        $and: [{ nombre: er }, { estado: true }]
    });
    return producto ? [producto] : [];
};

const getBusqueda = async (req, res = response) => {
    const { coleccion, elemento } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: 'Esta coleccion no esta en nuestra BD'
        });
    }
    let data;
    switch (coleccion) {
        case 'categorias':
            data = await buscarPorCategoria(elemento);
            console.log(data)
            res.status(200).json({
                data
            });
            break;

        case 'productos':
            data = await buscarPorProducto(elemento);
            res.status(200).json({
                data
            });
            break;

        case 'usuarios':
            data = await buscarPorUsuario(elemento);
            res.status(200).json({
                data
            });
            break;

        default:
            return res.status(500).json({
                msg: "Al dev del backend se le olvidó esta busqueda"
            });
    }
}



module.exports = {
    getBusqueda
}