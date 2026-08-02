// ===============================
// TaxiPilot - Script principale
// ===============================


// Recupero corse salvate
let corse = JSON.parse(localStorage.getItem("taxipilot_corse")) || [];


// ===============================
// GESTIONE CORSE
// ===============================


function salvaCorsa() {


    let cliente = document.getElementById("nomeCliente").value;
    let telefono = document.getElementById("telefono").value;
    let partenza = document.getElementById("partenza").value;
    let destinazione = document.getElementById("destinazione").value;
    let orario = document.getElementById("orario").value;
    let importo = document.getElementById("importo").value;



    if(
        cliente === "" ||
        partenza === "" ||
        destinazione === "" ||
        orario === ""
    ){

        alert("Compila tutti i campi obbligatori");

        return;

    }



    let nuovaCorsa = {

        id: Date.now(),

        cliente: cliente,

        telefono: telefono,

        partenza: partenza,

        destinazione: destinazione,

        orario: orario,

        importo: Number(importo) || 0,

        completata:false

    };



    corse.push(nuovaCorsa);



    localStorage.setItem(
        "taxipilot_corse",
        JSON.stringify(corse)
    );



    svuotaForm();

    mostraCorse();

    aggiornaStatistiche();



    alert("Corsa salvata correttamente");

}





function mostraCorse(){


    let contenitore = document.getElementById("listaCorse");



    if(!contenitore){

        return;

    }



    contenitore.innerHTML="";



    if(corse.length === 0){

        contenitore.innerHTML =
        `
        <p class="empty">
        Nessuna corsa inserita
        </p>
        `;

        return;

    }





    corse.forEach(corsa => {



        contenitore.innerHTML +=
        `

        <div class="trip-card">


        <h3>
        ${corsa.orario} - ${corsa.cliente}
        </h3>


        <p>
        ${corsa.partenza}
        →
        ${corsa.destinazione}
        </p>


        <p>
        Importo:
        <strong>
        ${corsa.importo.toFixed(2)} €
        </strong>
        </p>



        <button 
        class="delete-btn"
        onclick="eliminaCorsa(${corsa.id})">

        Elimina

        </button>


        </div>


        `;


    });



}






function eliminaCorsa(id){


    corse = corse.filter(
        corsa => corsa.id !== id
    );


    localStorage.setItem(
        "taxipilot_corse",
        JSON.stringify(corse)
    );


    mostraCorse();

    aggiornaStatistiche();


}







function svuotaForm(){


let campi = [

"nomeCliente",
"telefono",
"partenza",
"destinazione",
"orario",
"importo"

];


campi.forEach(id=>{

let elemento=document.getElementById(id);


if(elemento){

elemento.value="";

}

});


}






function openForm(){


let form = document.getElementById("formCorsa");


if(form){

form.classList.toggle("hidden");

}


}







// ===============================
// STATISTICHE HOME
// ===============================


function aggiornaStatistiche(){



let numeroCorse =
document.getElementById("numeroCorse");



let incasso =
document.getElementById("incassoTotale");



if(numeroCorse){


numeroCorse.innerHTML =
corse.length;


}




if(incasso){


let totale = corse.reduce(
(sum,corsa)=>sum+corsa.importo,
0
);



incasso.innerHTML =
totale.toFixed(2)+" €";


}



}







// ===============================
// STATO SERVIZIO
// ===============================


function cambiaStato(){


let stato =
localStorage.getItem("taxipilot_stato")
||
"Disponibile";



let elemento =
document.getElementById("statoServizio");



if(elemento){

elemento.innerHTML = stato;

}



}



function mostraProssimaCorsa(){


let box =
document.getElementById("prossimaCorsa");


if(!box){

return;

}



if(corse.length === 0){

box.innerHTML=
`
<p class="empty">
Nessuna corsa programmata
</p>
`;

return;

}




let prossima = corse[0];



box.innerHTML =
`

<div class="trip-box">


<div class="trip-time">

${prossima.orario}

</div>


<div class="trip-info">


<h3>
${prossima.cliente}
</h3>


<p>
${prossima.partenza}
→
${prossima.destinazione}
</p>


<p class="price">
${prossima.importo.toFixed(2)} €
</p>


</div>


</div>

`;

}

// ===============================
// AVVIO
// ===============================


document.addEventListener(
"DOMContentLoaded",
()=>{


mostraCorse();

aggiornaStatistiche();

mostraProssimaCorsa();

cambiaStato();


}
);
