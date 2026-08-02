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
// GESTIONE TURNO
// ===============================


function iniziaTurno(){


let km =
document.getElementById("kmInizio").value;



if(km === ""){

alert("Inserisci i chilometri iniziali");

return;

}



let turno = {


attivo:true,

inizio:
new Date().getTime(),

kmInizio:
km


};



localStorage.setItem(
"taxipilot_turno",
JSON.stringify(turno)
);



mostraTurno();



}





function mostraTurno(){



let box =
document.getElementById("statoTurno");



if(!box){

return;

}



let turno =
JSON.parse(
localStorage.getItem("taxipilot_turno")
);



if(!turno || !turno.attivo){


box.innerHTML =
`
<p class="empty">
Nessun turno attivo
</p>
`;

return;

}



let ora =
new Date(turno.inizio)
.toLocaleTimeString(
"it-IT",
{
hour:"2-digit",
minute:"2-digit"
}
);



box.innerHTML =
`

<div class="trip-card">

<h3>
Turno attivo
</h3>


<p>
Inizio:
${ora}
</p>


<p>
Km iniziali:
${turno.kmInizio}
</p>


</div>

`;



calcolaOreTurno();


}





function calcolaOreTurno(){


let turno =
JSON.parse(
localStorage.getItem("taxipilot_turno")
);



let oreBox =
document.getElementById("oreTurno");



if(!turno || !oreBox){

return;

}



let differenza =
Date.now()-turno.inizio;



let ore =
Math.floor(
differenza / 3600000
);



oreBox.innerHTML =
ore;



}




function terminaTurno(){


let conferma =
confirm(
"Terminare il turno?"
);



if(!conferma){

return;

}



localStorage.removeItem(
"taxipilot_turno"
);



mostraTurno();


alert(
"Turno terminato correttamente"
);


}

// ===============================
// CONFIGURAZIONE INIZIALE
// ===============================


let contattiSOS = JSON.parse(
    localStorage.getItem("taxipilot_contatti_sos")
) || [];





// Controllo primo accesso

function controlloPrimoAccesso(){


    let configurato =
    localStorage.getItem("taxipilot_configurato");


    if(
        !configurato &&
        !window.location.pathname.includes("setup.html")
    ){

        window.location.href="setup.html";

    }


}





// Aggiunta contatto SOS

function aggiungiContatto(){


    let nome =
    prompt("Inserisci nome contatto");


    if(!nome){

        return;

    }



    let numero =
    prompt("Inserisci numero telefono");


    if(!numero){

        return;

    }



    let contatto = {


        id: Date.now(),

        nome:nome,

        telefono:numero


    };



    contattiSOS.push(contatto);



    localStorage.setItem(
        "taxipilot_contatti_sos",
        JSON.stringify(contattiSOS)
    );



    mostraContatti();


}





// Visualizzazione contatti nella configurazione


function mostraContatti(){


    let contenitore =
    document.getElementById("contatti");


    if(!contenitore){

        return;

    }



    contenitore.innerHTML="";



    if(contattiSOS.length===0){


        contenitore.innerHTML=
        `
        <p class="empty">
        Nessun contatto salvato
        </p>
        `;


        return;

    }





    contattiSOS.forEach(contatto=>{


        contenitore.innerHTML +=
        `

        <div class="trip-card">

        <h3>
        ${contatto.nome}
        </h3>


        <p>
        ${contatto.telefono}
        </p>


        </div>

        `;


    });


}





// Completamento configurazione


function completaSetup(){



    let nome =
    document.getElementById("setupNome").value;



    if(nome===""){


        alert(
        "Inserisci il nome del tassista"
        );


        return;


    }



    if(contattiSOS.length===0){


        alert(
        "Inserisci almeno un contatto SOS"
        );


        return;


    }





    let profilo = {


        nome:nome


    };



    localStorage.setItem(
        "taxipilot_profilo",
        JSON.stringify(profilo)
    );



    localStorage.setItem(
        "taxipilot_configurato",
        "true"
    );



    window.location.href="index.html";


}






// ===============================
// SISTEMA SOS WHATSAPP
// ===============================


function attivaSOS(){


    if(contattiSOS.length===0){


        alert(
        "Nessun contatto SOS configurato"
        );


        return;


    }





    if(
        !confirm(
        "Attivare richiesta di emergenza?"
        )
    ){

        return;

    }






    if(
    navigator.geolocation
    ){



        navigator.geolocation.getCurrentPosition(

        posizione=>{


            let lat =
            posizione.coords.latitude;


            let lng =
            posizione.coords.longitude;



            inviaMessaggioSOS(lat,lng);



        },


        ()=>{


            inviaMessaggioSOS(
                "non disponibile",
                "non disponibile"
            );


        }

        );




    }else{


        inviaMessaggioSOS(
            "non disponibile",
            "non disponibile"
        );


    }



}





function inviaMessaggioSOS(lat,lng){



let profilo =
JSON.parse(
localStorage.getItem("taxipilot_profilo")
);



let nome =
profilo?.nome || "Tassista";



let messaggio =

`ALLARME TAXIPILOT

Richiesta di assistenza.

Autista:
${nome}

Posizione:
https://maps.google.com/?q=${lat},${lng}

Ora:
${new Date().toLocaleString("it-IT")}`;



let testo =
encodeURIComponent(messaggio);





contattiSOS.forEach(contatto=>{


let url =

`https://wa.me/${contatto.telefono}?text=${testo}`;



window.open(url,"_blank");



});


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

mostraTurno();


}
);
