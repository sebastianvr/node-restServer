const {Schema, model} = require('mongoose');


const RoleSchema = Schema({
    rol:{
        type: String,
        required: [true, 'Rol inválido']
    }
})

module.exports = model('Role', RoleSchema);