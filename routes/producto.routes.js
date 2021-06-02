
const { Router } = require('express');
const { check } = require('express-validator');

const { getProductoById,
    getProductos,
    postProductos,
    putProductos,
    deleteProductos } = require('../controllers/productos.controller');

const { validarJWT, validarCampos } = require('../middlewares');


const route = Router();

route.get('/:id', getProductoById);

route.get('/', getProductos);

route.post('/', [
    validarJWT,
    check('nombre', 'Campo nombre es obligatorio').not().isEmpty(),
    check('categoria', 'Campo categoria es obligatorio').not().isEmpty(),
    check('categoria', 'Categoria no es un id de mongo').isMongoId(),
    validarCampos
], postProductos);

route.put('/:id', putProductos);

route.delete('/:id', deleteProductos);

module.exports = route;
