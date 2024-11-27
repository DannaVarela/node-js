function pedirPizza(callback){
    console.log("pidiendo la pizza");
    setTimeout(() =>{
        console.log("la pizza está lista");
        callback();
    }, 2000);
}

function comerPizza(){
    console.log("Ahora puedo comer la pizza");
}

pedirPizza(comerPizza);