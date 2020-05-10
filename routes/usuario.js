const express = require('express');

const app = express();

const jwt = require('jsonwebtoken');

const mdAutenticacion = require('../middlewares/autenticacion');


const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');

//===============================================//
//              Obtener los Usuarios             //
//===============================================//


app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error al obtener los usuarios",
                        errors: err,
                    });
                }

                return res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            });
});




//===============================================//
//              Crear Usuario                    //
//===============================================//

app.post('/', mdAutenticacion.verificarToken, (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al crear Usuario",
                errors: err
            });
        }
        return res.status(201).json({
            ok: true,
            body: usuarioGuardado,
            usuarioToken: req.usuario
        });

    });

});

//===============================================//
//             Actualizar Usuario                //
//===============================================//

app.put('/:id', mdAutenticacion.verificarToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al busacar usuario",
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: `El usuario con el ${id} no existe`,
                errors: { message: 'No existe el usuario con ese id' }
            });
        }
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "Error al Actualizar el Usuario",
                    errors: err
                });
            }
            usuarioGuardado.password = ' :)';
            return res.status(200).json({
                ok: true,
                usuario: usuarioGuardado,
            });
        });
    });
});

//===============================================//
//             Borrar Usuario                    //
//===============================================//

app.delete('/:id', mdAutenticacion.verificarToken, (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al Borrar el Usuario",
                errors: err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: `El usuario con el ${id} no existe`,
                errors: { message: 'No existe el usuario con ese id' }
            });
        }

        return res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });


});

module.exports = app;