const fs = require('fs');
2
console.log("Inicio de la lectura de Archivos");
3
4
fs.readFile('archivo.txt', 'utf8', (err, data) =>{
5
if (err) throw err;
6
console.log("Contenido del Archivo:" + data);
7
});
8
9
console.log("Fin de la ejecucion")