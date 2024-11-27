
const express = require('express');
const app = express();
app.use(express.json());

let usuarios = [
    { id: 1, nombre: 'Juan', email: 'juan@email.com' },
    { id: 2, nombre: 'Maria', email: 'Maria@email.com' },
    { id: 3, nombre: 'Lucia', email: 'Lucia@email.com' },
];

// endpoint obtener todos los usuarios

app.get('/usuario', (req, res) => {
    res.json(usuarios)
});

// endpoint obtener por id

app.get('/usuario/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).send('Datos del usuario no encontrado');
    res.json(usuario)

});

//crear usuario
app.post('/usuario', (req, res) => {
    const nuevoUsuario = { id: usuarios.length + 1, nombre: req.body.nombre, email: req.body.email }
    if (!usuario) return res.status(404).send('Datos del usuario no encontrado');
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);

});

//actualizar un usuario
app.put('/usuario/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).send('Datos del usuario no encontrado');
    usuario.nombre = req.body.nombre
    usuario.email = req.body.email
    res.json(usuario);

});
// eliminar un usuario

app.delete('/usuario/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario === -1) return res.status(404).send('Datos del usuario no encontrado');
    const usuarioEliminado = usuarios.splice(usuario, 1);
    res.json(usuarioEliminado);

});

app.listen(3001, () => console.log('Servidor API restful escuchando en http://localhost:3001'));
