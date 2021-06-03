const { response } = require("express");
const { Producto } = require("../models");


const getProductoById = async (req, res = response) => {
    const { id } = req.params;

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria');

    return res.status(201).json({
        producto
    });
};

const getProductos = async (req, res = response) => {
    const estado = { estado: true };
    const { limite = 5, desde = 0 } = req.query;

    const [total, producto] = await Promise.all([
        Producto.countDocuments(estado),
        Producto.find(estado)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .limit(Number(limite))
            .skip(Number(desde)),
    ])

    return res.status(200).json({
        total,
        producto

    });
};

const postProductos = async (req, res = response) => {
    const { nombre, categoria, precio, descripcion } = req.body
    //console.log(req.body);

    const data = {
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id,
        categoria,
        precio,
        descripcion
    }

    const producto = new Producto(data);

    await producto.save();
    res.json({
        producto
    });
};

const putProductos = async (req, res) => {
    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    //si el nombre viene en la peticion
    if (resto.nombre) {
        resto.nombre = resto.nombre.toUpperCase();
    }

    producto = await Producto.findByIdAndUpdate(id, { resto }, { new: true })
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    return res.status(200).json({
        msg: 'Producto actualizada!',
        producto

    });
};

const deleteProductos = async (req, res = response) => {
    const id = req.params.id;
    const estado = { estado: false };

    const producto = await Producto.findByIdAndUpdate(id, estado, { new: true });
    await producto.save();

    res.json({
        msg: "todo ok delete productos",
        producto
    });
};

module.exports = {
    getProductoById,
    getProductos,
    postProductos,
    putProductos,
    deleteProductos
};