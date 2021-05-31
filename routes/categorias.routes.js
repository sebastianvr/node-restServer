const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
    validarJWT,
    tieneRole } = require('../middlewares');

const { existeCategoriaPorId,
    isCategoriaEliminada } = require('../helpers/db-validators');

const { categoriaGet,
    categoriaGetAll,
    categoriaPost,
    categoriaPut,
    categoriaDelete } = require('../controllers/categorias.controller');

const route = Router();

route.get('/', categoriaGetAll);

/* Condiciones para que el get por id sea correcto:
    - id no vacio
    - id tipo Mongo
    - id no eliminado en BD
    - id exista en BD
*/
route.get('/:id', [
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('id').custom(isCategoriaEliminada),
    validarCampos
], categoriaGet);

route.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriaPost);

route.put('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id de mongo').isMongoId(),
    validarCampos
], categoriaPut);

//problemas en el check para isCategoriaElim.., existeCat...
route.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(isCategoriaEliminada),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], categoriaDelete);

module.exports = route;