console.log("Inicio"); //sincrono

setTimeout(() =>{
    console.log("Esto se ejecuta despues de 2 segundos");
}, 2000);//asincrono

setTimeout(() =>{
    console.log("Esto se ejecuta en 0seg, pero despues del Inicio");
}, 0);//asincrono

console.log("Final");//sincrono