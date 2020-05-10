const express = require('express');

const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

const Usuario = require('../models/usuario');

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al obtener los usuarios",
                errors: err,
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: "Credenciales incorrectas - email",
                errors: err,
            });

        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: "Credenciales incorrectas - password",
                errors: err,
            });

        }
        //Crear Token!!
        usuarioDB.password = ":)";

        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });


        return res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });
    });

});







module.exports = app;