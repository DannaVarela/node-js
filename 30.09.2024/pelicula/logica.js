document.querySelector('#btnSubmit').addEventListener('click', guardarDatosPeliculas);
imprimirTabla();


function guardarDatosPeliculas() {
    var guardarPeliculaTitulo = document.querySelector('#title').value,
        guardarPeliculaDirector = document.querySelector('#director').value,
        guardarPeliculaLanzamiento = document.querySelector('#lanzamiento').value;
    
    agregarDatosPelicula(guardarPeliculaTitulo, guardarPeliculaDirector, guardarPeliculaLanzamiento);
    imprimirTabla();
}

function imprimirTabla() {
    var lista = obtenerListaPelicula(),
    tbody = document.querySelector('#tablaPelicula tbody');

    tbody.innerHTML = '';

    for (var i = 0; i < lista.length; i++) {
        var row = tbody.insertRow(i),
            tituloCelda = row.insertCell(0),
            directorCelda = row.insertCell(1);
            fechaCelda = row.insertCell(2);
        
        tituloCelda.innerHTML = lista[i].title;
        directorCelda.innerHTML = lista[i].director;
        fechaCelda.innerHTML = lista[i].date;

        tbody.appendChild(row);
    }
}