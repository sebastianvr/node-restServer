const {Schema, model} = require('mongoose');


const RoleSchema = Schema({
    rol:{
        type: String,
        required: [true, 'Rol inválido']
    }
})

// RoleSchema.method.toJson = function(){
//     const {__v, ...resto} = this.toObject();
//     return resto;
// };

module.exports = model('Role', RoleSchema);