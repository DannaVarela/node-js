const express = require('express');
const app = express();
app.use(express.json()); // Middleware para procesar cuerpos JSON

// Middleware para validar que la descripción esté presente
function validarTarea(req, res, next) {
    if (!req.body.descripcion) {
        return res.status(400).send('Error: La descripción es obligatoria.');
    }
    next(); // Pasa al siguiente middleware o ruta
}

let tareas = [];

// Definir la ruta POST con el middleware de validación
app.post('/tareas', validarTarea, (req, res) => {
    const nuevaTarea = { id: tareas.length + 1, descripcion: req.body.descripcion };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// Definir la ruta GET para ver todas las tareas
app.get('/tareas', (req, res) => {
    res.json(tareas);
});

app.listen(3001, () => {
    console.log('Servidor escuchando en http://localhost:3001');
});