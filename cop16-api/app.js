const express = require('express');
const app = express();
const projectsRouter = require('./proyectos'); // Importa tus rutas


app.use(express.json()); // Middleware para manejar datos JSON

// Usa las rutas de proyectos en '/projects'
app.use('/projects', projectsRouter);

// Iniciar el servidor en el puerto 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
