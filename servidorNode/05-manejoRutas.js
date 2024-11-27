const express = require('express');
const app = express();

app.get('/usuario', (req,res) => {
    res.send('Listado de usuarios')
});

app.get('/usuarios/:id', (req,res) => {
    const idUsuario = req.params.id;
    res.send(`Datos del usuario con ID ${idUsuario}`);
});

app.get('/usuarios/:id?', (req,res) => {
    const idUsuario = req.params.id;

    if (idUsuario){
        res.send(`Datos del usuario con ID ${idUsuario}`);
    }else{
        res.send('otro Listado de usuarios');
    }
});

app.get('/usuarios/:id/tarea/:idTarea', (req,res) => {
    const idUsuario = req.params.id;
    const idTarea= req.params.idTarea;
    res.send(`Datos de la tarea ${idTarea} del usuario con id ${idUsuario}`);
});

app.get('/categoria/:idCategoria/Producto/:idProducto/cantidad/:cantidad', (req,res) => {
    const idCategoria = req.params.idCategoria;
    const idProducto= req.params.idProducto;
    const cantidadProductos= req.params.cantidad;
    res.send(`La cantidad ${cantidadProductos} es del producto con id ${idProducto} de la categoria ${idCategoria}`);
});

app.get('/categoria/:idCategoria/Producto/:idProducto/cantidad/:cantidad', (req,res) => {
    const idCategoria = req.params.idCategoria;
    const idProducto= req.params.idProducto;
    const cantidadProductos= req.params.cantidad;
    res.send(`La cantidad ${cantidadProductos} es del producto con id ${idProducto} de la categoria ${idCategoria}`);
});

app.get('/usuarios', (req,res) => {
    const idUsuario = req.params.id;
    if (idUsuario){
        res.send(`Datos del usuario con ID ${idUsuario}`);
    }else{
        res.send('otro Listado de usuarios');
    }
});






app.listen(3001, () => console.log('Servidor escuchando en http://localhost:3001'));
