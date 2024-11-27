// // ejm 1
// const express = require('express');
// const app = express();
// app.use(express.json());

// let tareas = [];

// app.get('/tareas', (req, res) => {
//     res.json(tareas);
// });

// app.post('/tareas', (req, res) => {
//     const tarea = { id: tareas.length + 1, descripcion: req.body.descripcion };
//     tareas.push(tarea);
//     res.status(201).json(tarea);
// });

// app.listen(3001, () => console.log('API de tareas escuchando en http://localhost:3001'));

//ejm 2

const express = require('express');
const app = express();
app.use(express.json());

const usuarioRouter = express.Router();
const tareaRouter = express.Router({mergeParams: true});

const usuarios =[
    {id: 1, nombre: 'Juan'},
    {id: 2, nombre: 'Maria'},
]

const tareas ={
    1: [{id: 1, descripcion: 'Tarea 1'}],
    2: [{id: 2, descripcion: 'Tarea 2'}]    
};

usuarioRouter.get('/', (req, res) => {
    res.json(usuarios);
});



tareaRouter.get('/',(req, res) => {
    const userId  = req.params.id;
    res.json(tareas[userId] || []);
});

//intenta filtar los usuario
// usuarioById.get('/:id', (req, res) => {
//     const id  = req.params.id;
//     res.json(usuarios[id] || []);
// });

app.use('/usuarios', usuarioRouter);
usuarioRouter.use('/:id/tareas', tareaRouter);

//que filtre mediante el id los usuarios 
// app.use('/usuarios', usuarioRouter);
// usuarioRouter.use('/:id/usuario', usuarioById);



app.listen(3001, () => console.log('Servidor escuchando en http://localhost:3001'));


//ejmp 3 danna comparar

// const express = require('express');
// const app = express();
// app.use(express.json());

// const usuarioRouter = express.Router();
// const tareaRouter = express.Router({ mergeParams: true });

// const usuarios = [
//     { id: 1, nombre: 'Juan' },
//     { id: 2, nombre: 'Maria' },
// ];

// const tareas = {
//     1: [{ id: 1, descripcion: 'Tarea 1' }],
//     2: [{ id: 2, descripcion: 'Tarea 2' }]
// };

// // Ruta para obtener todos los usuarios (solo id y nombre)
// usuarioRouter.get('/', (req, res) => {
//     const usuariosSimplificados = usuarios.map(({ id, nombre }) => ({ id, nombre }));
//     res.json(usuariosSimplificados);
// });

// // Ruta para obtener un usuario específico por id
// usuarioRouter.get('/:id', (req, res) => {
//     const userId = parseInt(req.params.id);
//     const usuario = usuarios.find(u => u.id === userId);
    
//     if (usuario) {
//         res.json({ id: usuario.id, nombre: usuario.nombre });
//     } else {
//         res.status(404).json({ mensaje: 'Usuario no encontrado' });
//     }
// });

// // Ruta para obtener tareas de un usuario específico
// tareaRouter.get('/', (req, res) => {
//     const userId = req.params.id;
//     res.json(tareas[userId] || []);
// });

// app.use('/usuarios', usuarioRouter);
// usuarioRouter.use('/:id/tareas', tareaRouter);

// app.listen(3001, () => console.log('Servidor escuchando en http://localhost:3001'));
