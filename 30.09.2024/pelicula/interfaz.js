var peliculaDatos = [];

function agregarDatosPelicula(peliculaTitulo, peliculaDirector, peliculaFechaLanzamiento) {
    
    var NuevaPelicula = {
        title: peliculaTitulo,
        director: peliculaDirector,
        date: peliculaFechaLanzamiento
    };

    console.log(NuevaPelicula); 
    peliculaDatos.push(NuevaPelicula);
}

function obtenerListaPelicula() {
    return peliculaDatos;
}