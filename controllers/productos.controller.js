const { response } = require("express");
const Producto = require("../models");


const getProductoById = (req, res) => {
    res.json({
        msg: "todo ok get"
    });
};

const getProductos = (req, res) => {
    res.json({
        msg: "todo ok getall"
    });
};

const postProductos = async (req, res = response) => {
    const { nombre, precio, categoria } = req.body
    
    const data = {
        nombre,
        usuario : `${req.usuario._id}`,
        categoria
    }


    console.log(data)

    const producto = new Producto(data);
    //console.log(producto)

    await producto.save();
    res.json({
        msg: "todo ok post",
        nombre, 
        precio
    });
};

const putProductos = (req, res) => {
    res.json({
        msg: "todo ok put productos"
    });
};

const deleteProductos = (req, res) => {
    res.json({
        msg: "todo ok delete productos"
    });
};

module.exports = {
    getProductoById,
    getProductos,
    postProductos,
    putProductos,
    deleteProductos
};