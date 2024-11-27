var EstudianteDatos = [];

function agregarDatosEstudiante(EstudianteNombre, EstudianteEdad, EstudianteGrado) {
    
    var NuevoEstudiante = {
        nombre: EstudianteNombre,
        edad: EstudianteEdad,
        grado: EstudianteGrado
    };

    console.log(NuevoEstudiante); 
    EstudianteDatos.push(NuevoEstudiante);
}

function obtenerListaPelicula() {
    return peliculaDatos;
}