//Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// importar Rutas
const appRoutes = require('./routes/app');
const usuarioRoutes = require('./routes/usuario');
const loginRoutes = require('./routes/login');




//Inicializar Variables
const app = express();

//Body Parser
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





//conexion a la base de datos

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', err => {

    if (err) throw err;

    console.log('Base de Datos: \x1b[36m%s\x1b[0m', 'online');
});

//Rutas

app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);



//Escuchar petiiciones

app.listen(3000, () => {

    console.log('Servidor Express: \x1b[36m%s\x1b[0m', 'online');

});