const promesaDePizza = new Promise((resolve, reject) => {
    let pizzaLista = false;

    if (pizzaLista){
        resolve("la pizza Está lista");
    }else {
        reject("No se pudo hacer la pizza");
    }
});

promesaDePizza
    .then((mensaje) =>{
        console.log(mensaje);
    })
    .catch((error) =>{
        console.log(error);
    })