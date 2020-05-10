const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Squema = mongoose.Schema;

const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
}

const usuarioSquema = new Squema({

    nombre: { type: String, required: [true, "El nombre es necesario"] },
    email: { type: String, unique: true, required: [true, "El correo es necesario"] },
    password: { type: String, required: [true, "La contraseña es necesaria"] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }

});

usuarioSquema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });


module.exports = mongoose.model('Usuario', usuarioSquema);