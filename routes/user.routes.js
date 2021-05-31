const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
    validarJWT,
    tieneRole } = require('../middlewares')

const { esRolValido, 
    existeEmail, 
    existeUsuarioPorId, 
    isUsarioEliminado } = require('../helpers/db-validators');


const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete } = require('../controllers/usuarios.controller');


const router = Router();

/*
nombre ruta, controlador
puedo enviar valores opcionales en la url con ?dato=algo&dato2=algo usando req.params
*/
router.get('/', usuariosGet);

//nombre ruta, middlewares[], controlador
router.post('/', [

    /*Express validator permite sanitizar mis datos de entrada,
    Es importante entender que el check va a ser codificado con lo que si debe tener para saltar al otro check */
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 carácteres').isLength({ min: 6 }),

    /*comprobacion si es un correo correcto*/
    check('correo', 'Falta el campo correo').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),

    /*comprobacion si existe, debido a que no pueden existir dos correo iguales*/
    check('correo').custom(existeEmail),

    //check('rol').custom(esRolValido),

    /*
        Notar que validarcampos no es pasado como una funcion solo (sin foo()), es pasado como referencia
        al igual que los custom, la req y res son enviados a la funcion "implicitamente"
    */
    validarCampos,


], usuariosPost);

//actualizar enviando id
router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('id').custom(isUsarioEliminado),
    check('rol').custom(esRolValido),
    check('correo').custom(existeEmail),
    validarCampos
], usuariosPut);

//elimino usando id
router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(isUsarioEliminado),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;