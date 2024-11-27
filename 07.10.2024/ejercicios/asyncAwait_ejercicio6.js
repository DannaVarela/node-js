function hervirAgua(){
    return new Promise((resolve) => {
        console.log("Poniendo el agua a hervir");
        setTimeout(()=>{
            resolve("El agua está lista");
        }, 3000);
    });
}

async function hacerCafe() {
    console.log("Preparando para hacer café");
    const agua = await hervirAgua();
    console.log(agua);
    console.log("el café está listo");
    
}

hacerCafe();