const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/login.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const route = Router();


route.post('/login', [
    check('correo', 'El correo es invalido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
    ], login
);


route.post('/google', [
    check('id_token', 'El token esta vacio').not().isEmpty(),
    validarCampos
    ], googleSignIn
);

module.exports = route;