function analizarTexto(){
    let texto = document.getElementById("texto").value.trim();
    let palabras = texto.split(" ");

    palabras = palabras.filter(palabras => palabras.length >0);

    let numeroPalabras = palabras.length;
    let palabraLarga = palabras.reduce((inicial, actual) => actual.length >inicial.length ? actual : inicial, "");

    document.getElementById("resultado").innerText = `Numero de palabras: ${numeroPalabras}. Palabra mas larga: ${palabraLarga}`;
}