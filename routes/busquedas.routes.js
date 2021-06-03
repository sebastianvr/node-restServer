const { Router } = require('express');
const { check } = require('express-validator');

const { getBusqueda } = require('../controllers/busquedas.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const route = Router();


route.get('/:coleccion/:elemento',[
    check('coleccion', 'La coleccion es obligatoria').not().isEmpty(),
    check('elemento', 'El elemento es obligatorio').not().isEmpty(),
    validarCampos
], getBusqueda);




module.exports = route;