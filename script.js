// ===============================
// ACCESSO DISPOSITIVO
// ===============================


let contattiLogin = JSON.parse(
localStorage.getItem("taxipilot_contatti_sos")
) || [];





function controlloAccesso(){


let configurato =
localStorage.getItem(
"taxipilot_configurato"
);



if(
!configurato &&
!window.location.pathname.includes("login.html")
){

window.location.href="login.html";

}


}





function aggiungiContattoLogin(){


let nome =
prompt("Nome contatto");



let numero =
prompt("Numero telefono");



if(!nome || !numero){

return;

}



contattiLogin.push({

id:Date.now(),

nome:nome,

telefono:numero

});



mostraContattiLogin();


}







function mostraContattiLogin(){


let box =
document.getElementById(
"loginContatti"
);



if(!box){

return;

}



box.innerHTML="";



contattiLogin.forEach(contatto=>{


box.innerHTML +=
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






function salvaAccesso(){



let nome =
document.getElementById(
"loginNome"
).value;



let taxi =
document.getElementById(
"loginTaxi"
).value;




if(!nome){

alert(
"Inserisci il nome tassista"
);

return;

}





let profilo={


nome:nome,

taxi:taxi


};





localStorage.setItem(
"taxipilot_profilo",
JSON.stringify(profilo)
);




localStorage.setItem(
"taxipilot_contatti_sos",
JSON.stringify(contattiLogin)
);




localStorage.setItem(
"taxipilot_configurato",
"true"
);



window.location.href="index.html";


}







function caricaNomeHome(){


let nomeBox =
document.getElementById(
"nomeAutista"
);



if(!nomeBox){

return;

}



let profilo =
JSON.parse(
localStorage.getItem("taxipilot_profilo")
);



if(profilo){

nomeBox.innerHTML =
profilo.nome;

}


}

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

    stato:"Programmata"

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


let contenitore =
document.getElementById("listaCorse");



if(!contenitore){

return;

}



contenitore.innerHTML="";



if(corse.length===0){

contenitore.innerHTML =
`
<p class="empty">
Nessuna corsa inserita
</p>
`;

return;

}




corse.forEach(corsa=>{


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



<p>
Stato:
<strong>
${corsa.stato}
</strong>
</p>





<button
class="main-button"
onclick="cambiaStatoCorsa(${corsa.id})">

Cambia stato

</button>





<button
class="main-button"
onclick="navigaCorsa('${corsa.destinazione}')">

Naviga

</button>





<button
class="delete-btn"
onclick="eliminaCorsa(${corsa.id})">

Elimina

</button>


</div>

`;



});


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

function cambiaStatoCorsa(id){


let corsa =
corse.find(
c => c.id === id
);



if(!corsa){

return;

}

function navigaCorsa(destinazione){


let url =

"https://www.google.com/maps/search/?api=1&query="
+
encodeURIComponent(destinazione);



window.open(
url,
"_blank"
);


}


let stati = [

"Programmata",

"In arrivo",

"Cliente a bordo",

"Completata"

];



let posizione =
stati.indexOf(corsa.stato);



posizione++;



if(posizione >= stati.length){

posizione=0;

}



corsa.stato =
stati[posizione];



localStorage.setItem(
"taxipilot_corse",
JSON.stringify(corse)
);



mostraCorse();

mostraProssimaCorsa();


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
            // ===============================
// VISUALIZZA CONTATTI SOS
// ===============================

function mostraListaSOS(){


let box =
document.getElementById("listaSOS");


if(!box){

return;

}


box.innerHTML="";



if(contattiSOS.length === 0){


box.innerHTML =
`
<p class="empty">
Nessun contatto salvato
</p>
`;

return;

}




contattiSOS.forEach(contatto=>{


box.innerHTML +=
`

<div class="trip-card">


<h3>
${contatto.nome}
</h3>


<p>
${contatto.telefono}
</p>


<button 
class="delete-btn"
onclick="eliminaContattoSOS(${contatto.id})">

Elimina

</button>


</div>

`;



});


}



box.innerHTML="";



if(contattiSOS.length===0){

box.innerHTML=
`
<p class="empty">
Nessun contatto salvato
</p>
`;

return;

}



contattiSOS.forEach(contatto=>{


box.innerHTML +=
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
// PROFILO COMPLETO
// ===============================


function salvaProfiloCompleto(){


let profilo = {


nome:
document.getElementById("nomeProfilo").value,


numeroTaxi:
document.getElementById("numeroTaxi").value,


veicolo:
document.getElementById("modelloVeicolo").value,


targa:
document.getElementById("targaVeicolo").value


};



localStorage.setItem(
"taxipilot_profilo",
JSON.stringify(profilo)
);



alert(
"Profilo aggiornato"
);


}




function caricaProfiloCompleto(){


let profilo =
JSON.parse(
localStorage.getItem("taxipilot_profilo")
);



if(!profilo){

return;

}




let campi = {


nomeProfilo:
profilo.nome || "",


numeroTaxi:
profilo.numeroTaxi || "",


modelloVeicolo:
profilo.veicolo || "",


targaVeicolo:
profilo.targa || ""


};





for(let id in campi){


let campo =
document.getElementById(id);



if(campo){

campo.value = campi[id];

}


}



mostraContattiProfilo();


}







function mostraContattiProfilo(){


let box =
document.getElementById("listaContattiProfilo");



if(!box){

return;

}



box.innerHTML="";



if(contattiSOS.length === 0){


box.innerHTML =
`
<p class="empty">
Nessun contatto configurato
</p>
`;

return;

}





contattiSOS.forEach(contatto=>{


box.innerHTML +=
`

<div class="trip-card">


<h3>
${contatto.nome}
</h3>


<p>
${contatto.telefono}
</p>



<button
class="delete-btn"
onclick="eliminaContattoSOS(${contatto.id})">

Elimina

</button>


</div>

`;



});


}

function eliminaContattoSOS(id){



let conferma =
confirm(
"Eliminare questo contatto?"
);



if(!conferma){

return;

}




contattiSOS =
contattiSOS.filter(
contatto => contatto.id !== id
);



localStorage.setItem(
"taxipilot_contatti_sos",
JSON.stringify(contattiSOS)
);



mostraListaSOS();

mostraContattiProfilo();


}



box.innerHTML="";



if(contattiSOS.length===0){


box.innerHTML=
`
<p class="empty">
Nessun contatto configurato
</p>
`;

return;

}




contattiSOS.forEach(contatto=>{


box.innerHTML +=
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

// ===============================
// AVVIO
// ===============================


document.addEventListener(
"DOMContentLoaded",
()=>{


controlloPrimoAccesso();

mostraContatti();

mostraListaSOS();

mostraCorse();

aggiornaStatistiche();

mostraProssimaCorsa();

cambiaStato();

mostraTurno();

caricaProfiloCompleto();


}
);
