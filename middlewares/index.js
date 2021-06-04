const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');
const validarSubidaArchivo = require('../middlewares/validar-subida-archivo');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarSubidaArchivo
}