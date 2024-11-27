const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());

// CONFIGURACIÓN DE LA CONEXIÓN A LA BASE DE DATOS
let db;

(async () => {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            //password: '',
            database: 'cop16_api'
        });
        console.log('Conectado a la base de datos MySQL');
    } catch (err) {
        console.error('Error de conexión a la base de datos:', err.stack);
    }
})();

// MIDDLEWARE PARA AÑADIR LA CONEXIÓN A LA BASE DE DATOS AL OBJETO REQ
app.use((req, res, next) => {
    req.db = db;
    next();
});

// RUTA PARA LISTAR usuarios.js
const usuariosRoutes = require('./routes/usuarios.js');

// USAR RUTA DE LA URL BASE /USUARIOS
app.use('/usuarios', usuariosRoutes);

app.listen(3001, () => console.log('Servidor API RESTFul a DB escuchando en http://localhost:3001'));
