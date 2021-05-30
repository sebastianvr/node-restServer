const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, 
    validarJWT } = require('../middlewares');

const { categoriaGet, 
    categoriaGetAll, 
    categoriaPost, 
    categoriaPut,
    categoriaDelete } = require('../controllers/categorias.controller');

const route = Router();

route.get('/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
],categoriaGet);

route.get('/',[
    validarCampos
], categoriaGetAll);

route.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriaPost);

route.put('/:id',[
    validarCampos
], categoriaPut);

route.delete('/:id',[
    validarCampos
], categoriaDelete);

module.exports = route;