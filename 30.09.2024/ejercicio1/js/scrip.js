function calcularPromedio() {
    let notas = document.getElementById('notas').value.split(",").map(Number)
    let suma = 0; 

    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    }
 
    let promedio = suma / notas.length;

    let resultado = promedio  >= 60 ? "Aprobado" : "Reprobado";

    document.getElementById("resultado").innerHTML = `Promedio: ${promedio.toFixed(2)} - ${resultado}`;

}