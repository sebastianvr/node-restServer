
const { Router } = require('express');
const { check } = require('express-validator');

const { getProductoById,
    getProductos,
    postProductos,
    putProductos,
    deleteProductos } = require('../controllers/productos.controller');

const { validarJWT, validarCampos } = require('../middlewares');

const { existeProductoPorId, 
    existeCategoriaPorId,
    existeProductoByNombre,
    esProductoEliminado,
    isCategoriaEliminada
} = require('../helpers/db-validators');

const route = Router();

/* En get by id, obligatoriamente el cliente necesita pasar en params un id de una cateogria*/
route.get('/:id',[
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('categoria','El campo categoria es obligatorio').not().isEmpty(),
    check('categoria').custom(isCategoriaEliminada),
    validarCampos
], getProductoById);


route.get('/', getProductos);

route.post('/', [
    validarJWT,
    check('nombre', 'Campo nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeProductoByNombre),
    check('categoria', 'Campo categoria es obligatorio').not().isEmpty(),
    check('categoria', 'Categoria no es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], postProductos);

/* Para actualizar debe el cliente mandar el id de la categoria a la que pertenece*/
route.put('/:id', [
    validarJWT,
    check('id', 'Campo id es obligatorio').not().isEmpty(),
    check('id', 'No es un id de mongo').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoPorId),
    check('id').custom(esProductoEliminado),
    validarCampos,
    check('categoria', 'Categoria no es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    check('categoria').custom(isCategoriaEliminada),

    validarCampos
], putProductos);

route.delete('/:id', [
    validarJWT,
    check('id', 'Campo id es obligatorio').not().isEmpty(),
    check('id', 'No es un id de mongo').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoPorId),
    check('id').custom(esProductoEliminado),
    validarCampos
], deleteProductos);

module.exports = route;
