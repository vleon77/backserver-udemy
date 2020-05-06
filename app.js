//Requires
const express = require('express');
const mongoose = require('mongoose');



//Inicializar Variables
var app = express();


//conexxion a la base de datos

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', err => {

    if (err) throw err;

    console.log('Base de Datos: \x1b[36m%s\x1b[0m', 'online');
})



//Escuchar petiiciones

app.listen(3000, () => {

    console.log('Servidor Express: \x1b[36m%s\x1b[0m', 'online');

});

//Rutas

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: "La petición fue enviada correctamente"
    });
})