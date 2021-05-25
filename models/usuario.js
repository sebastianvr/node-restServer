const { Schema, model } = require('mongoose');

const UsuarioShema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],

    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    imagen: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'La rol es obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }


});

UsuarioShema.methods.toJSON = function (){
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
};

//primer parametro en singular
module.exports = model('Usuario', UsuarioShema);