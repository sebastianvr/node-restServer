const { Router } = require('express');
const { check } = require('express-validator');

const { postArchivo,
    actualizarImagen,
    obtenerImagen,
    actualizarImagenCloudinary } = require('../controllers/uploads.controller');

const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarCampos, validarArchivo } = require('../middlewares');


const router = Router();

router.post('/', validarArchivo, postArchivo);

router.put('/:coleccion/:id', [
    check('id', 'El id debe ser valido de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarArchivo,
    validarCampos
], actualizarImagenCloudinary)
//], actualizarImagen)

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser valido de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], obtenerImagen)



module.exports = router;