function verificarCandidato(nombre, cumpleRequisitos, noCumpleRequisitos){
    console.log(`Verificando al candidato ${nombre}`);

    const cumple = Math.random() > 0.5;

    if (cumple) {
        cumpleRequisitos(nombre);
    }else{
        noCumpleRequisitos(nombre);
    }
}

function aceptarCandidato(nombre){
    console.log(`${nombre} ha sido aceptado. Se procede con la oferta`);
}

function rechazarCandidato(nombre){
    console.log(`${nombre} no cumple los requisitos, Se notificará el rechazo`);
}

verificarCandidato("Juan Perez", aceptarCandidato, rechazarCandidato);