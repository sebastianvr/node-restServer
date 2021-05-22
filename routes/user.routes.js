const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeE, existeUsuarioPorId } = require('../helpers/db-validators');


const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete } = require('../controllers/usuarios.controller');


const router = Router();

//nombre ruta, controlador
router.get('/', usuariosGet);

//nombre ruta, middleware, controlador
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 carácteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    //check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(existeE),
    check('rol').custom(esRolValido),
    //notar que validarcampos no es pasado como una funcion solo (sin foo()), es pasado como referencia
    //la req y res son enviados a la funcion "implicitamente"
    validarCampos,
    
    
], usuariosPost);

//actualizar enviando id
router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPut);

//elimino usando id
router.delete('/:id', usuariosDelete);

module.exports = router;