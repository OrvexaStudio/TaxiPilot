// ======================================================
// TaxiPilot
// SCRIPT DEFINITIVO
// PARTE 1/4
// ACCESSO + PROFILO
// ======================================================



// ===============================
// DATABASE LOCALE
// ===============================


let profiloTaxi =
JSON.parse(
localStorage.getItem("taxipilot_profilo")
) || null;



let contattiSOS =
JSON.parse(
localStorage.getItem("taxipilot_contatti_sos")
) || [];



let corse =
JSON.parse(
localStorage.getItem("taxipilot_corse")
) || [];

let filtroGiornoCorse = "oggi";
let vistaCorse = "future";



// ===============================
// CONTROLLO ACCESSO
// ===============================


function controlloAccesso(){


    let configurato =
    localStorage.getItem(
        "taxipilot_configurato"
    );


    let pagina =
    window.location.pathname;


    let eLogin =
    pagina.includes(
        "login.html"
    );
let eBenvenuto =
pagina.includes(
"benvenuto.html"
);


    if(
        !configurato &&
        !eLogin
    ){

        window.location.href =
        "login.html";

        return;

    }




    if(
configurato &&
eLogin
){

let visto =
localStorage.getItem(
"taxipilot_benvenuto"
);


if(!visto){

window.location.href =
"benvenuto.html";

}

else{

window.location.href =
"index.html";

}


return;

}


}







// ===============================
// LOGIN PRIMO ACCESSO
// ===============================



function aggiungiContattoLogin(){


    let nome =
    prompt(
        "Nome contatto SOS"
    );


    let telefono =
    prompt(
        "Numero telefono"
    );



    if(
        !nome ||
        !telefono
    ){

        return;

    }




    contattiSOS.push({


        id:
        Date.now(),


        nome:
        nome,


        telefono:
        telefono


    });




    salvaContatti();



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




    box.innerHTML = "";



    if(
        contattiSOS.length===0
    ){

        box.innerHTML =

        `<p class="empty">
        Nessun contatto aggiunto
        </p>`;

        return;

    }





    contattiSOS.forEach(
    contatto=>{


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





    if(
        nome.trim()===""
    ){

        alert(
            "Inserisci il nome del tassista"
        );

        return;

    }






    profiloTaxi = {


        nome:
        nome,


        taxi:
        taxi,


        veicolo:
        "",


        targa:
        "",


        creato:
        Date.now()


    };





    localStorage.setItem(

        "taxipilot_profilo",

        JSON.stringify(
            profiloTaxi
        )

    );




    salvaContatti();




    localStorage.setItem(

        "taxipilot_configurato",

        "true"

    );





   window.location.href =
"benvenuto.html";



}









// ===============================
// SALVATAGGIO CONTATTI
// ===============================



function salvaContatti(){



    localStorage.setItem(

        "taxipilot_contatti_sos",

        JSON.stringify(
            contattiSOS
        )

    );


}









// ===============================
// HOME NOME TASSISTA
// ===============================



function caricaNomeHome(){



    let box =
    document.getElementById(
        "nomeAutista"
    );



    if(
        !box
    ){

        return;

    }




    if(
        profiloTaxi
    ){

        box.innerHTML =
        profiloTaxi.nome;

    }


}








// ===============================
// PROFILO COMPLETO
// ===============================



function caricaProfiloCompleto(){



    if(
        !profiloTaxi
    ){

        return;

    }




    let campi = {


        nomeProfilo:
        profiloTaxi.nome || "",



        numeroTaxi:
        profiloTaxi.taxi || "",



        modelloVeicolo:
        profiloTaxi.veicolo || "",



        targaVeicolo:
        profiloTaxi.targa || ""



    };






    Object.keys(campi).forEach(

    id=>{


        let elemento =
        document.getElementById(
            id
        );



        if(
            elemento
        ){

            elemento.value =
            campi[id];

        }


    });



}









function salvaProfiloCompleto(){



    profiloTaxi = {


        ...profiloTaxi,



        nome:
        document.getElementById(
            "nomeProfilo"
        ).value,



        taxi:
        document.getElementById(
            "numeroTaxi"
        ).value,



        veicolo:
        document.getElementById(
            "modelloVeicolo"
        ).value,



        targa:
        document.getElementById(
            "targaVeicolo"
        ).value



    };





    localStorage.setItem(

        "taxipilot_profilo",

        JSON.stringify(
            profiloTaxi
        )

    );




    alert(
        "Profilo aggiornato"
    );


}

// ======================================================
// TaxiPilot
// PARTE 2/4
// SISTEMA SOS
// ======================================================



// ===============================
// AGGIUNGI CONTATTO SOS
// ===============================


function aggiungiContatto(){


    let nome =
    prompt(
        "Nome contatto"
    );



    let telefono =
    prompt(
        "Numero telefono"
    );



    if(
        !nome ||
        !telefono
    ){

        return;

    }





    contattiSOS.push({


        id:
        Date.now(),


        nome:
        nome,


        telefono:
        telefono



    });






    salvaContatti();



    mostraListaSOS();

    mostraContattiProfilo();



}









// ===============================
// MOSTRA CONTATTI SOS
// ===============================



function mostraListaSOS(){



    let box =
    document.getElementById(
        "listaSOS"
    );



    if(
        !box
    ){

        return;

    }




    box.innerHTML="";





    if(
        contattiSOS.length===0
    ){


        box.innerHTML =

        `
        <p class="empty">
        Nessun contatto salvato
        </p>
        `;


        return;

    }







    contattiSOS.forEach(
    contatto=>{



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

        onclick="eliminaContattoSOS(${contatto.id})"

        >

        Elimina

        </button>



        </div>


        `;



    });


}









// ===============================
// CONTATTI PROFILO
// ===============================



function mostraContattiProfilo(){



    let box =
    document.getElementById(
        "listaContattiProfilo"
    );



    if(
        !box
    ){

        return;

    }





    box.innerHTML="";





    if(
        contattiSOS.length===0
    ){


        box.innerHTML =

        `
        <p class="empty">
        Nessun contatto configurato
        </p>
        `;


        return;


    }







    contattiSOS.forEach(
    contatto=>{


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
// ELIMINA CONTATTO
// ===============================



function eliminaContattoSOS(id){



    let conferma =
    confirm(
        "Eliminare questo contatto?"
    );



    if(
        !conferma
    ){

        return;

    }





    contattiSOS =

    contattiSOS.filter(

        contatto =>

        contatto.id !== id

    );





    salvaContatti();



    mostraListaSOS();

    mostraContattiProfilo();



}









// ===============================
// ATTIVA SOS
// ===============================



function attivaSOS(){



    if(
        contattiSOS.length===0
    ){


        alert(
            "Nessun contatto SOS configurato"
        );


        return;

    }






    if(
        !confirm(
        "Inviare richiesta di emergenza?"
        )
    ){

        return;

    }







    if(
        navigator.geolocation
    ){



        navigator.geolocation.getCurrentPosition(


        posizione=>{



            inviaMessaggioSOS(


            posizione.coords.latitude,


            posizione.coords.longitude


            );



        },



        ()=>{


            inviaMessaggioSOS(

            "non disponibile",

            "non disponibile"

            );


        }



        );



    }

    else{


        inviaMessaggioSOS(

        "non disponibile",

        "non disponibile"

        );


    }



}









// ===============================
// WHATSAPP SOS
// ===============================



function inviaMessaggioSOS(
lat,
lng
){



    let nome =

    profiloTaxi?.nome ||

    "Tassista";






    let messaggio =


`ALLARME TAXIPILOT

Richiesta assistenza.

Autista:
${nome}

Posizione:
https://maps.google.com/?q=${lat},${lng}

Ora:
${new Date().toLocaleString("it-IT")}

`;







    let testo =

    encodeURIComponent(
        messaggio
    );







contattiSOS.forEach(

(contatto, index)=>{


let numero =
contatto.telefono.replace(
    /\s/g,
    ""
);


setTimeout(()=>{


window.location.href =
`https://wa.me/${numero}?text=${testo}`;


}, index * 1500);


}

);



}

// ======================================================
// TaxiPilot
// PARTE 3/4
// GESTIONE CORSE
// ======================================================



// ===============================
// SALVA CORSA
// ===============================



function salvaCorsa(){


    let cliente =
    document.getElementById(
        "nomeCliente"
    ).value;



    let telefono =
    document.getElementById(
        "telefono"
    ).value;
// CONTROLLO BLACKLIST CLIENTE

let clienteBloccato =
clientiBlacklist.find(

cliente =>

cliente.telefono.replace(/\s/g,"")
===
telefono.replace(/\s/g,"")

);



if(clienteBloccato){


let conferma =

confirm(

"ATTENZIONE: questo cliente è presente nella blacklist.\n\n" +

"Cliente: " +
clienteBloccato.nome +

"\nMotivo: " +
clienteBloccato.motivo +

"\n\nVuoi comunque salvare la corsa?"

);



if(!conferma){

return;

}


}


    let partenza =
    document.getElementById(
        "partenza"
    ).value;



    let destinazione =
    document.getElementById(
        "destinazione"
    ).value;

    let numeroVolo =
document.getElementById(
"numeroVolo"
)?.value || "";

let dataCorsa =
document.getElementById(
"dataCorsa"
).value;

    let orario =
    document.getElementById(
        "orario"
    ).value;



    let importo =
    Number(
    document.getElementById(
        "importo"
    ).value
    ) || 0;





   if(
    !partenza ||
    !telefono ||
    !dataCorsa ||
    !orario
){

    alert(
        "Inserisci indirizzo di partenza, telefono, data e orario"
    );

    return;

}







    let corsa = {


        id:
        Date.now(),


        cliente:
        cliente,


        telefono:
        telefono,


        partenza:
        partenza,


        destinazione:
        destinazione,

        numeroVolo:
        numeroVolo,
        
        data:
        dataCorsa,

        orario:
        orario,


        importo:
        importo,


        stato:
        "Programmata",



        dataCreazione:
        new Date()
        .toLocaleDateString(
         "it-IT"
)


    };






    corse.push(
        corsa
    );



    salvaCorse();



    svuotaForm();



    mostraCorse();

    mostraProssimaCorsa();

    aggiornaStatistiche();
   
    aggiungiCalendario(corsa.id);



}









function salvaCorse(){


    localStorage.setItem(

        "taxipilot_corse",

        JSON.stringify(
            corse
        )

    );


}






function cambiaGiornoCorse(giorno){

    filtroGiornoCorse = giorno;

    if(giorno === "passate"){
        vistaCorse = "passate";
    } else {
        vistaCorse = "future";
    }

    mostraCorse();

}


// ===============================
// MOSTRA CORSE
// ===============================


function cambiaVistaCorse(vista){

    vistaCorse = vista;


    document.getElementById("btnFuture")
    ?.classList.remove("switch-active");


    document.getElementById("btnPassate")
    ?.classList.remove("switch-active");



    if(vista === "future"){

        document.getElementById("btnFuture")
        ?.classList.add("switch-active");

    }
    else{

        document.getElementById("btnPassate")
        ?.classList.add("switch-active");

    }


    mostraCorse();

}

function mostraCorse(){



    let box =
    document.getElementById(
        "listaCorse"
    );



    if(
        !box
    ){

        return;

    }





    box.innerHTML="";





    if(
        corse.length===0
    ){


        box.innerHTML=

        `
        <p class="empty">
        Nessuna corsa inserita
        </p>
        `;


        return;


    }






    let lista =
    [...corse];
    console.log(corse);
console.log(filtroGiornoCorse);

    // FILTRO FUTURE / PASSATE



    let adesso = new Date();

    lista = lista.filter(corsa=>{

        let dataOra =
        new Date(
            corsa.data +
            "T" +
            corsa.orario
        );


        if(vistaCorse === "future"){

            return dataOra >= adesso;

        }


        if(vistaCorse === "passate"){

            return dataOra < adesso;

        }


    });



// FILTRO GIORNO CORSE

if(filtroGiornoCorse !== "tutte"){


let oggi = new Date();

oggi.setHours(0,0,0,0);



lista = lista.filter(corsa=>{


let dataOra = new Date(
corsa.data +
"T" +
corsa.orario
);



if(filtroGiornoCorse === "oggi"){


return dataOra.toDateString()
===
oggi.toDateString();


}



if(filtroGiornoCorse === "domani"){


let domani = new Date(oggi);

domani.setDate(
oggi.getDate()+1
);



return dataOra.toDateString()
===
domani.toDateString();


}



if(filtroGiornoCorse === "passate"){


return dataOra < new Date();


}


});


}







    
    let ricerca =
document.getElementById(
"cercaCorsa"
)?.value
.toLowerCase()
|| "";


if(
ricerca !== ""
){


lista =
lista.filter(

corsa =>


corsa.cliente
.toLowerCase()
.includes(ricerca)

||

corsa.destinazione
.toLowerCase()
.includes(ricerca)


);


}



    lista.sort(

    (a,b)=>

    a.orario.localeCompare(
        b.orario
    )

    );







    lista.forEach(

    corsa=>{



        box.innerHTML +=


        `

        <div class="trip-card">


<p>
Data: ${new Date(corsa.data).toLocaleDateString("it-IT")}
</p>

<h3>

${corsa.orario}

-

${corsa.cliente}

</h3>




        <p>

        ${corsa.partenza}

        →

        ${corsa.destinazione}

        </p>




        <p>

        Importo:

        <strong>

        ${corsa.importo.toFixed(2)}
        €

        </strong>

        </p>





      

<button

class="main-button"

onclick="modificaCorsa(${corsa.id})"

>

Modifica corsa

</button>

${
corsa.numeroVolo
?

`
<button
class="main-button"
onclick="monitoraVolo('${corsa.numeroVolo}')">

Monitora volo

</button>
`

:

""

}


<div class="action-buttons">


        <button

        class="main-button"

        onclick="chiamaCliente('${corsa.telefono}')"

        >

        Chiama

        </button>

<button

class="main-button"

onclick="whatsappCliente(${corsa.id})"

>

WhatsApp

</button>
</div>

<button

class="btn-cliente"

onclick="navigaCliente('${corsa.partenza}')"

>

Vai dal cliente

</button>


        <button

        class="btn-arrivo"

        onclick="navigaCorsa('${corsa.destinazione}')"

        >

        Indirizzo di arrivo

        </button>


<button

class="main-button"

onclick="aggiungiCalendario(${corsa.id})"

>

Aggiungi al calendario

</button>




        <button

        class="delete-btn"

        onclick="eliminaCorsa(${corsa.id})"

        >

        Elimina

        </button>





        </div>


        `;



    });



}









// ===============================
// CAMBIO STATO
// ===============================



function cambiaStatoCorsa(id){



    let corsa =

    corse.find(

    c=>

    c.id===id

    );



    if(
        !corsa
    ){

        return;

    }







    let stati = [


    "Programmata",


    "In arrivo",


    "Cliente a bordo",


    "Completata"



    ];







    let posizione =

    stati.indexOf(
        corsa.stato
    );






    posizione++;





    if(
        posizione >= stati.length
    ){

        posizione=0;

    }





    corsa.stato =

    stati[posizione];





    salvaCorse();


    mostraCorse();

    mostraProssimaCorsa();



}









// ===============================
// ELIMINA CORSA
// ===============================



function eliminaCorsa(id){

if(
!confirm(
"Sei sicuro di voler eliminare questa corsa?"
)
){

return;

}

    corse =

    corse.filter(

    c =>

    c.id !== id

    );



    salvaCorse();



    mostraCorse();

    mostraProssimaCorsa();

    aggiornaStatistiche();



}









// ===============================
// TELEFONO CLIENTE
// ===============================



function chiamaCliente(numero){


    if(
        !numero
    ){

        alert(
        "Numero non disponibile"
        );

        return;

    }



    window.location.href =

    "tel:" + numero;



}








// ===============================
// GOOGLE MAPS
// ===============================



function navigaCorsa(destinazione){


    let url =


    "https://www.google.com/maps/search/?api=1&query="

    +

    encodeURIComponent(
        destinazione
    );



    window.open(

    url,

    "_blank"

    );


}


function navigaCliente(partenza){

    let url =
    "https://www.google.com/maps/search/?api=1&query="
    +
    encodeURIComponent(
        partenza
    );

    window.open(
        url,
        "_blank"
    );

}






// ===============================
// PULISCI FORM
// ===============================



function svuotaForm(){



    let campi=[


    "nomeCliente",

    "telefono",

    "partenza",

    "destinazione",

    "orario",

    "importo"



    ];





    campi.forEach(

    id=>{


        let campo =

        document.getElementById(
            id
        );



        if(
            campo
        ){

            campo.value="";

        }


    });


}









// ===============================
// PROSSIMA CORSA HOME
// ===============================



function mostraProssimaCorsa(){



    let box =

    document.getElementById(
        "prossimaCorsa"
    );



    if(
        !box
    ){

        return;

    }




let adesso = new Date();


let disponibili = corse.filter(corsa=>{


    let dataOra = new Date(
        corsa.data +
        "T" +
        corsa.orario
    );


    return (
        corsa.stato !== "Completata"
        &&
        dataOra >= adesso
    );


});






    if(
        disponibili.length===0
    ){

        box.innerHTML=

        `
        <p class="empty">
        Nessuna corsa programmata
        </p>
        `;


        return;

    }






    disponibili.sort(

    (a,b)=>

    a.orario.localeCompare(
        b.orario
    )

    );





    let corsa =

    disponibili[0];
    console.log("Corsa home:", corsa);





    box.innerHTML =


    `

<div class="trip-box">


<div class="trip-time">

${corsa.orario}

</div>



<div class="trip-info">


<h3>

${corsa.cliente || "Cliente"}

</h3>



<p>

${corsa.partenza}

→

${corsa.destinazione || ""}

</p>



<strong>

${corsa.importo.toFixed(2)}

€

</strong>



</div>



<div class="next-actions">


<button

class="small-call"

onclick="chiamaCliente('${corsa.telefono}')"

>

Chiama

</button>



<button

class="small-whatsapp"

onclick="whatsappCliente(${corsa.id})"

>

WhatsApp

</button>


</div>


</div>


    `;



}

// ======================================================
// TaxiPilot
// PARTE 4/4
// TURNO + STATISTICHE + AVVIO APP
// ======================================================



// ======================================================
// GESTIONE TURNO AVANZATA
// ======================================================


let storicoTurni = JSON.parse(
    localStorage.getItem("taxipilot_turni")
) || [];




// AVVIO TURNO

function iniziaTurno(){


let km =
document.getElementById(
    "kmInizio"
)?.value || "";



    if(km === ""){

        km =
        localStorage.getItem(
            "taxipilot_ultimo_km"
        );

    }



    let turno = {

        attivo:true,

        inizio:
        Date.now(),
            indiceCorse:
    corse.length,

        oraInizio:
        new Date().toLocaleTimeString(
            "it-IT",
            {
                hour:"2-digit",
                minute:"2-digit"
            }
        ),


        kmInizio:
        km === "" ? null : Number(km)

    };



    localStorage.setItem(

        "taxipilot_turno_attivo",

        JSON.stringify(turno)

    );



    mostraTurno();


}






// VISUALIZZA TURNO


function mostraTurno(){


    let box =
    document.getElementById(
        "statoTurno"
    );



    if(!box){

        return;

    }



    let turno =
    JSON.parse(
        localStorage.getItem(
            "taxipilot_turno_attivo"
        )
    );



    if(!turno){


        box.innerHTML =

        `
        <p class="empty">
        Nessun turno attivo
        </p>
        `;


        return;

    }




    box.innerHTML =


    `

    <div class="trip-card">


    <h3>
    Turno attivo
    </h3>


    <p>
    Inizio:
    ${turno.oraInizio}
    </p>


    <p>
    Km iniziali:
    ${turno.kmInizio}
    </p>



    <button
    class="main-button"
    onclick="terminaTurno()">

    Termina turno

    </button>


    </div>

    `;


}






// CHIUSURA TURNO


function terminaTurno(){



    let turno =

    JSON.parse(

        localStorage.getItem(
            "taxipilot_turno_attivo"
        )

    );



    if(!turno){

        return;

    }




    let kmFinali = prompt(
"Inserisci chilometri finali (opzionale)"
);
    
localStorage.setItem(
    "taxipilot_ultimo_km",
    kmFinali
);





if(kmFinali === null || kmFinali === ""){

    kmFinali = null;

}
else{

    kmFinali = Number(kmFinali);

}

localStorage.setItem(

    "taxipilot_ultimo_km",

    kmFinali

);



let kmPercorsi =

(
kmFinali !== null &&
turno.kmInizio !== null
)

?

kmFinali - turno.kmInizio

:

null;





    let durata =

    Date.now() -

    turno.inizio;





    let ore =

    durata / 3600000;






    let oggi =

    new Date()

    .toLocaleDateString(
        "it-IT"
    );





   let corseTurno = corse.slice(
    turno.indiceCorse || 0
);





    let incasso =

    corseTurno.reduce(

        (totale,corsa)=>

        totale +

        Number(
            corsa.importo
        ),

        0

    );






let oraFine =
new Date().toLocaleTimeString(
    "it-IT",
    {
        hour:"2-digit",
        minute:"2-digit"
    }
);


let dataOraFine =
new Date();




let minutiTotali =
Math.floor(
    durata / 60000
);


let oreIntere =
Math.floor(
    minutiTotali / 60
);


let minutiRimanenti =
minutiTotali % 60;



let durataFormattata =
oreIntere +
" h " +
minutiRimanenti +
" min";





let turnoChiuso = {


    id:
    Date.now(),


    data:
    oggi,


    oraInizio:
    turno.oraInizio,


    oraFine:
    oraFine,


    durata:
    durataFormattata,


    ore:
    Number(
        ore.toFixed(2)
    ),


    kmInizio:
    turno.kmInizio,


    kmFine:
    kmFinali,


    kmPercorsi:
    kmPercorsi,


    corse:
    corseTurno.length,


    incasso:
    incasso


};






    storicoTurni.push(
        turnoChiuso
    );





    localStorage.setItem(

        "taxipilot_turni",

        JSON.stringify(
            storicoTurni
        )

    );





    localStorage.removeItem(

        "taxipilot_turno_attivo"

    );





    mostraTurno();



    alert(

    "Turno terminato e salvato"

    );



}






function caricaUltimiKm(){


    let campo =
    document.getElementById(
        "kmInizio"
    );


    if(!campo){

        return;

    }



    let ultimoKm =
    localStorage.getItem(
        "taxipilot_ultimo_km"
    );



    if(ultimoKm !== null){

        campo.value = ultimoKm;

    }


}



// ===============================
// STATO SERVIZIO
// ===============================



function cambiaStato(){



    let box =

    document.getElementById(
        "statoServizio"
    );



    if(
        !box
    ){

        return;

    }





    let stato =

    localStorage.getItem(

        "taxipilot_stato"

    )

    ||

    "Disponibile";





    box.innerHTML =
    stato;



}









function cambiaStatoServizio(){



    let stato =

    localStorage.getItem(

        "taxipilot_stato"

    )

    ||

    "Disponibile";







    let nuovo;



    if(
        stato === "Disponibile"
    ){

        nuovo =
        "In servizio";

    }

    else{


        nuovo =
        "Disponibile";

    }







    localStorage.setItem(

        "taxipilot_stato",

        nuovo

    );





    cambiaStato();



}









// ===============================
// STATISTICHE
// ===============================



function aggiornaStatistiche(){



    let boxCorse =

    document.getElementById(
        "numeroCorse"
    );



    let boxIncasso =

    document.getElementById(
        "incassoGiornaliero"
    );





    if(
        !boxCorse ||
        !boxIncasso
    ){

        return;

    }





    let oggi =

    new Date()

    .toLocaleDateString(
        "it-IT"
    );






    let corseOggi =

    corse.filter(

    corsa =>

    corsa.dataCorsa === oggi

    );






    let totale =

    corseOggi.reduce(

    (somma,corsa)=>

    somma +

    Number(
        corsa.importo
    ),

    0

    );






    boxCorse.innerHTML =

    corseOggi.length;



    boxIncasso.innerHTML =

    totale.toFixed(2)

    +

    " €";



}









// ===============================
// FORM CORSA
// ===============================



function openForm(){



    let form =

    document.getElementById(
        "formCorsa"
    );



    if(
        form
    ){

        form.classList.toggle(
            "hidden"
        );

    }


}





let logoPDF = null;


let immagineLogo = new Image();


immagineLogo.src = "logo.png";


immagineLogo.onload = function(){

    let canvas = document.createElement("canvas");

    canvas.width = immagineLogo.width;

    canvas.height = immagineLogo.height;


    let ctx = canvas.getContext("2d");


    ctx.drawImage(
        immagineLogo,
        0,
        0
    );


    logoPDF =
    canvas.toDataURL(
        "image/png"
    );

};

function esportaPDF(){


    const { jsPDF } = window.jspdf;


    let pdf = new jsPDF();
    if(logoPDF){


pdf.addImage(
logoPDF,
"PNG",
15,
10,
30,
30
);


}

let logo =
new Image();

logo.src =
"logo.png";

   logo.onload = function(){


pdf.addImage(
logo,
"PNG",
15,
10,
30,
30
);



pdf.setFontSize(18);


pdf.text(
"TaxiPilot - Report lavoro",
55,
25
);



    let nome =
    profiloTaxi?.nome || "Tassista";

    let periodo =
document.getElementById(
"filtroStatistiche"
)?.value || "tutto";



    pdf.setFontSize(12);


    pdf.text(
        "Autista: " + nome,
        15,
        50
    );

    pdf.text(
"Periodo: " + periodo,
15,
60
);


    let corse =
    document.getElementById(
        "statCorse"
    ).innerText;


    let incasso =
    document.getElementById(
        "statIncasso"
    ).innerText;


    let ore =
    document.getElementById(
        "statOre"
    ).innerText;


    let km =
    document.getElementById(
        "statKm"
    ).innerText;




    pdf.text(
"Corse: " + corse,
15,
80
);


pdf.text(
"Incasso: " + incasso,
15,
90
);


    pdf.text(
"Ore: " + ore,
15,
100
);


  pdf.text(
"Km: " + km,
15,
110
);

// TABELLA TURNI

let turni =
JSON.parse(
localStorage.getItem("taxipilot_turni")
) || [];



let turniPeriodo =
filtraTurni(
    turni,
    periodo
);



if(turniPeriodo.length > 0){


    pdf.addPage();


    pdf.setFontSize(16);


    pdf.text(
        "Storico turni",
        15,
        20
    );



    let righe = turniPeriodo.map(
    turno => [


        turno.data,


        turno.kmInizio + " km",


        turno.kmFine + " km",


        turno.kmPercorsi + " km",


        turno.ore + " h",


        turno.corse,


        turno.incasso.toFixed(2) + " €"


    ]);





    pdf.autoTable({


        startY:30,


        head:[

        [

        "Data",

        "Km iniziali",

        "Km finali",

        "Km percorsi",

        "Ore",

        "Corse",

        "Incasso"

        ]

        ],


        body:righe


    });


}

    // ===============================
// INSERIMENTO GRAFICI NEL PDF
// ===============================


let graficoIncassi =
document.getElementById(
"graficoIncassi"
);



let graficoOre =
document.getElementById(
"graficoOre"
);



let graficoKm =
document.getElementById(
"graficoKm"
);





pdf.addPage();



pdf.setFontSize(16);


pdf.text(
"Grafici lavoro",
15,
20
);





if(graficoIncassi){


    let img1 =
    graficoIncassi.toDataURL(
        "image/png"
    );


    pdf.addImage(
        img1,
        "PNG",
        15,
        30,
        180,
        70
    );

}






if(graficoOre){


    let img2 =
    graficoOre.toDataURL(
        "image/png"
    );


    pdf.addImage(
        img2,
        "PNG",
        15,
        110,
        180,
        70
    );

}





pdf.addPage();


pdf.text(
"Grafico chilometri",
15,
20
);



if(graficoKm){


    let img3 =
    graficoKm.toDataURL(
        "image/png"
    );


    pdf.addImage(
        img3,
        "PNG",
        15,
        30,
        180,
        80
    );

}
   pdf.save(
    "TaxiPilot_Report.pdf"
);


};

}

// ===============================
// AVVIO APPLICAZIONE
// ===============================

// ======================================================
// STATISTICHE PROFILO
// ======================================================


let grafico1;
let grafico2;
let grafico3;




function caricaStatistiche(){


let filtro =
document.getElementById(
"filtroStatistiche"
)?.value || "oggi";



let turni = JSON.parse(

localStorage.getItem(
"taxipilot_turni"

)

) || [];




let dati = filtraTurni(
turni,
filtro
);




let numeroCorse = 0;
let incasso = 0;
let ore = 0;
let km = 0;



dati.forEach(t=>{


numeroCorse += t.corse;

incasso += t.incasso;

ore += t.ore;

km += t.kmPercorsi;


});




let statCorse =
document.getElementById("statCorse");

let statIncasso =
document.getElementById("statIncasso");

let statOre =
document.getElementById("statOre");

let statKm =
document.getElementById("statKm");



if(statCorse){

    statCorse.innerHTML = numeroCorse;

}


if(statIncasso){

    statIncasso.innerHTML =
    incasso.toFixed(2)+" €";

}


if(statOre){

    statOre.innerHTML =
    ore.toFixed(1)+" h";

}


if(statKm){

    statKm.innerHTML =
    km+" km";

}




creaGrafici(dati);


}






function filtraTurni(turni, filtro){


    let oggi = new Date();


    return turni.filter(t=>{


        let data =
        new Date(
            t.data.split("/").reverse().join("-")
        );



        // OGGI

        if(filtro === "oggi"){

            return data.toDateString()
            ===
            oggi.toDateString();

        }




        // IERI

        if(filtro === "ieri"){

            let ieri = new Date();

            ieri.setDate(
                oggi.getDate()-1
            );


            return data.toDateString()
            ===
            ieri.toDateString();

        }





        // SETTIMANA

        if(filtro === "settimana"){


            let inizio =
            new Date();


            inizio.setDate(
                oggi.getDate()-7
            );


            return data >= inizio;

        }







        // QUESTO MESE

        if(filtro === "mese"){


            return (

            data.getMonth()
            ===
            oggi.getMonth()

            &&

            data.getFullYear()
            ===
            oggi.getFullYear()

            );


        }








        // MESE SCORSO

        if(filtro === "meseScorso"){


            let mese =
            oggi.getMonth()-1;


            let anno =
            oggi.getFullYear();



            if(mese < 0){

                mese = 11;

                anno--;

            }



            return (

            data.getMonth()
            ===
            mese

            &&

            data.getFullYear()
            ===
            anno

            );


        }







        // MESI

        let mesi = {

            gennaio:0,

            febbraio:1,

            marzo:2,

            aprile:3,

            maggio:4,

            giugno:5,

            luglio:6,

            agosto:7,

            settembre:8,

            ottobre:9,

            novembre:10,

            dicembre:11

        };





        if(
            mesi[filtro] !== undefined
        ){


            return (

            data.getMonth()
            ===
            mesi[filtro]

            );


        }







        // TUTTO

        if(filtro==="tutto"){

            return true;

        }





        // ANNO

        if(filtro==="anno"){


            return (

            data.getFullYear()
            ===
            oggi.getFullYear()

            );


        }





        return true;


    });


}







function creaGrafici(dati){


let giorni =
dati.map(
d=>d.data
);



if(grafico1)
grafico1.destroy();


grafico1 =
new Chart(

document.getElementById(
"graficoIncassi"
),

{

type:"line",

data:{

labels:giorni,

datasets:[{

label:"Incassi €",

data:dati.map(
d=>d.incasso
)

}]

}

}

);





if(grafico2)
grafico2.destroy();


grafico2 =
new Chart(

document.getElementById(
"graficoOre"
),

{

type:"line",

data:{

labels:giorni,

datasets:[{

label:"Ore lavorate",

data:dati.map(
d=>d.ore
)

}]

}

}

);






if(grafico3)
grafico3.destroy();


grafico3 =
new Chart(

document.getElementById(
"graficoKm"
),

{

type:"line",

data:{

labels:giorni,

datasets:[{

label:"Km percorsi",

data:dati.map(
d=>d.kmPercorsi
)

}]

}

}

);



}

document.addEventListener(

"DOMContentLoaded",

()=>{
let tema =
localStorage.getItem(
"taxipilot_tema"
);



if(
tema==="dark"
){

document.body.classList.add(
"dark-mode"
);

}



if(
tema==="light"
){

document.body.classList.add(
"light-mode"
);

}


    controlloAccesso();



    caricaNomeHome();



    caricaProfiloCompleto();



    mostraContattiLogin();



    mostraListaSOS();



    mostraContattiProfilo();



    mostraCorse();



    mostraProssimaCorsa();



    aggiornaStatistiche();



    mostraTurno();
    aggiornaAssistenteTaxiPilot();

    caricaUltimiKm();

    cambiaStato();

   if(document.getElementById("graficoIncassi")){

    caricaStatistiche();

}



}

);









// aggiornamento ore turno ogni minuto


setInterval(

()=>{


    aggiornaOreTurno();


},

60000

);

if(
"serviceWorker" in navigator
){
navigator.serviceWorker.register(
"sw.js"
)
.then(registration=>{


registration.update();



registration.addEventListener(
"updatefound",
()=>{


let nuovaVersione =
registration.installing;



nuovaVersione.addEventListener(
"statechange",
()=>{

if(
nuovaVersione.state === "installed"
&&
navigator.serviceWorker.controller
&&
localStorage.getItem("aggiornamentoVisto") !== "true"
){


window.location.href =
"aggiornamento.html";


}


});


});


});

}
document.addEventListener(
"visibilitychange",
()=>{

    if(
        document.visibilityState === "visible" &&
        navigator.serviceWorker.controller
    ){

        navigator.serviceWorker.getRegistration()
        .then(registration=>{

            if(registration){

                registration.update();

            }

        });

    }

});

window.addEventListener(
"load",
()=>{

setTimeout(
()=>{

if(
navigator.serviceWorker
){

navigator.serviceWorker
.getRegistration()
.then(
registration=>{

if(registration){

registration.update();

}

});

}

},
2000
);

});

window.addEventListener(
"load",
()=>{

    navigator.serviceWorker
    .getRegistration()
    .then(
    registration=>{

        if(registration){

            registration.update();

        }

    });

});

function iniziaTaxiPilot(){


    localStorage.setItem(
        "taxipilot_benvenuto",
        "true"
    );


    window.location.href =
    "index.html";


}

function cercaCorse(){

    mostraCorse();

}

function esportaBackup(){


let backup = {


profilo:
localStorage.getItem(
"taxipilot_profilo"
),


corse:
localStorage.getItem(
"taxipilot_corse"
),


turni:
localStorage.getItem(
"taxipilot_turni"
),


contattiSOS:
localStorage.getItem(
"taxipilot_contatti_sos"
)


};



let file = new Blob(

[
JSON.stringify(
backup,
null,
2
)
],

{
type:"application/json"
}

);



let link =
document.createElement(
"a"
);



link.href =
URL.createObjectURL(
file
);



link.download =
"TaxiPilot_backup.json";



link.click();


}

function importaBackup(event){


let file =
event.target.files[0];


if(!file){

    return;

}



let lettore =
new FileReader();



lettore.onload = function(e){


let backup =
JSON.parse(
e.target.result
);



if(backup.profilo){

localStorage.setItem(
"taxipilot_profilo",
backup.profilo
);

}



if(backup.corse){

localStorage.setItem(
"taxipilot_corse",
backup.corse
);

}



if(backup.turni){

localStorage.setItem(
"taxipilot_turni",
backup.turni
);

}



if(backup.contattiSOS){

localStorage.setItem(
"taxipilot_contatti_sos",
backup.contattiSOS
);

}



alert(
"Backup ripristinato correttamente"
);



location.reload();



};



lettore.readAsText(file);


}

function cambiaTema(){


if(
document.body.classList.contains(
"dark-mode"
)
){


document.body.classList.remove(
"dark-mode"
);


document.body.classList.add(
"light-mode"
);


localStorage.setItem(
"taxipilot_tema",
"light"
);


}

else{


document.body.classList.remove(
"light-mode"
);


document.body.classList.add(
"dark-mode"
);


localStorage.setItem(
"taxipilot_tema",
"dark"
);


}


}

function aggiungiCalendario(id){


let corsa =
corse.find(
c =>
c.id === id
);



if(!corsa){

return;

}



let dataOra =
corsa.data
+
"T"
+
corsa.orario
+
":00";


let inizio =
new Date(dataOra);


if(isNaN(inizio.getTime())){

    return;

}



let fine =
new Date(
inizio.getTime()
+
60 * 60 * 1000
);



function formattaICS(data){

return data
.toISOString()
.replace(/[-:]/g,"")
.split(".")[0]
+
"Z";

}




let evento =

`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:TaxiPilot | ${corsa.cliente} | ${corsa.destinazione}
DESCRIPTION:
Cliente: ${corsa.cliente}
Telefono: ${corsa.telefono}
Partenza: ${corsa.partenza}
Destinazione: ${corsa.destinazione}
Importo: ${corsa.importo} euro
DTSTART:${formattaICS(inizio)}
DTEND:${formattaICS(fine)}
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:TaxiPilot - Corsa tra 15 minuti
END:VALARM

BEGIN:VALARM
TRIGGER:-PT45M
ACTION:DISPLAY
DESCRIPTION:TaxiPilot - Corsa tra 45 minuti
END:VALARM
END:VEVENT
END:VCALENDAR`;




let file =
new Blob(
[evento],
{
type:"text/calendar"
}
);



let link =
document.createElement("a");



link.href =
URL.createObjectURL(file);


link.download =
"Corsa_" + corsa.cliente + "_TaxiPilot.ics";



link.click();
    alert(
"Promemoria creato. Apri il file per aggiungere la corsa al calendario con avvisi 45 e 15 minuti prima."
);



}

function whatsappCliente(id){


    let corsa = corse.find(
        c => c.id === id
    );


    if(!corsa){
        return;
    }


    let messaggio =

`Salve ${corsa.cliente},

sono l'autista della Cooperativa Taxi Lecce.

Le ricordiamo la sua corsa:

Partenza:
${corsa.partenza}

Destinazione:
${corsa.destinazione}

Orario:
${corsa.orario}

A tra poco.

Cooperativa Taxi Lecce`;


    let testo = encodeURIComponent(
        messaggio
    );


let numero = corsa.telefono
.replace(/\s/g,"")
.replace("+39","")
.replace("+","");


numero = "39" + numero;


    window.open(
        "https://wa.me/" + numero + "?text=" + testo,
        "_blank"
    );

}

function modificaCorsa(id){

    let corsa = corse.find(
        c => c.id === id
    );


    if(!corsa){
        return;
    }


    let cliente = prompt(
        "Nome cliente",
        corsa.cliente || ""
    );


    let telefono = prompt(
        "Telefono cliente",
        corsa.telefono || ""
    );


    let partenza = prompt(
        "Indirizzo partenza",
        corsa.partenza || ""
    );


    let destinazione = prompt(
        "Indirizzo arrivo",
        corsa.destinazione || ""
    );


let dataVisualizzata = "";

if(corsa.data){

    let parti = corsa.data.split("-");

    dataVisualizzata =
    parti[2] + "/" +
    parti[1] + "/" +
    parti[0];

}


let data = prompt(
    "Data corsa (GG/MM/AAAA)",
    dataVisualizzata
);


    let orario = prompt(
        "Orario corsa",
        corsa.orario || ""
    );


    let importo = prompt(
        "Importo €",
        corsa.importo || 0
    );


    corsa.cliente = cliente;
    corsa.telefono = telefono;
    corsa.partenza = partenza;
    corsa.destinazione = destinazione;
    if(data){

    let partiData = data.split("/");

    corsa.data =
    partiData[2] + "-" +
    partiData[1] + "-" +
    partiData[0];

}
    corsa.orario = orario;
    corsa.importo = Number(importo) || 0;


    salvaCorse();

    mostraCorse();

    mostraProssimaCorsa();

    aggiornaStatistiche();


}

window.addEventListener(
"load",
()=>{

    setTimeout(
    ()=>{

        navigator.serviceWorker
        .getRegistration()
        .then(
        registration=>{

            if(registration){

                registration.update();

            }

        });

    },
    3000
    );

});


// ===============================
// SUGGERIMENTO TARIFFA AUTOMATICO
// ===============================


async function geocodeTaxi(indirizzo){

let risposta = await fetch(

"https://nominatim.openstreetmap.org/search?format=json&q="
+
encodeURIComponent(indirizzo)

);


let dati = await risposta.json();


if(dati.length===0){

throw "Indirizzo non trovato";

}


return {

lat:dati[0].lat,

lon:dati[0].lon

};

}




async function calcolaSuggerimento(){


let partenza =
document.getElementById(
"partenza"
).value;


let destinazione =
document.getElementById(
"destinazione"
).value;


let orario =
document.getElementById(
"orario"
).value;



if(!partenza || !destinazione){

alert(
"Inserisci partenza e destinazione"
);

return;

}



let box =
document.getElementById(
"suggerimentoPrezzo"
);


box.innerHTML =
"Calcolo tariffa...";



try{


let p =
await geocodeTaxi(partenza);


let d =
await geocodeTaxi(destinazione);



let url =

"https://router.project-osrm.org/route/v1/driving/"
+
p.lon+","+p.lat+
";"+
d.lon+","+d.lat+
"?overview=false";



let risposta =
await fetch(url);



let percorso =
await risposta.json();



let km =
percorso.routes[0].distance / 1000;



let prezzo =
5 + (km * 1.65);



let dettagli = [];



if(orario){


let ora =
Number(
orario.split(":")[0]
);



if(ora>=21 && ora<24){

prezzo += 3;

dettagli.push(
"Notturno 21-00: +3€"
);

}



if(ora>=0 && ora<6){

prezzo += 5;

dettagli.push(
"Notturno 00-06: +5€"
);

}


}



if(prezzo < 15){

prezzo = 15;

}




box.innerHTML =

`

<div class="suggestion-box">

<b>Suggerimento tariffa</b>

<br>

Distanza:
${km.toFixed(1)} km

<br><br>

Prezzo consigliato:

<strong>
${prezzo.toFixed(2)} €
</strong>


<br><br>


<button
class="main-button"
onclick="usaSuggerimento(${prezzo.toFixed(2)})"
>

Usa suggerimento

</button>


</div>

`;



}

catch(e){

box.innerHTML =
"Errore nel calcolo distanza";

}



}





function usaSuggerimento(prezzo){


document.getElementById(
"importo"
).value =
prezzo;


}

function aggiornaAssistenteTaxiPilot(){


let box =
document.getElementById(
"assistenteTurno"
);


if(!box){
    return;
}



let nome =
profiloTaxi?.nome || "Autista";



let oggi =
new Date()
.toISOString()
.split("T")[0];

let adesso = new Date();


let corseOggi =
corse.filter(
corsa => {

let dataOra =
new Date(
corsa.data +
"T" +
corsa.orario
);


return (
corsa.data === oggi
&&
dataOra >= adesso
);

}
);



let prossima =
corse
.filter(
corsa => {

let dataOra =
new Date(
corsa.data +
"T" +
corsa.orario
);


return (
dataOra > new Date()
&&
corsa.stato !== "Completata"
);

}

)
.sort(
(a,b)=>

new Date(
a.data+"T"+a.orario
)

-

new Date(
b.data+"T"+b.orario
)

)[0];



let turno =
JSON.parse(
localStorage.getItem(
"taxipilot_turno_attivo"
)
);



let oraAttuale =
new Date().getHours();


let saluto;


if(oraAttuale >= 5 && oraAttuale < 12){

saluto = "Buongiorno";

}

else if(oraAttuale >= 12 && oraAttuale < 18){

saluto = "Buon pomeriggio";

}

else{

saluto = "Buonasera";

}



let testo =

saluto
+
" "
+
nome
+
", oggi hai "
+
corseOggi.length
+
" corse programmate.";



if(prossima){


let minuti =

Math.floor(

(
new Date(
prossima.data+
"T"+
prossima.orario
)
-
new Date()

)
/60000

);

if(minuti <= 20){

testo +=

"<br><br><strong class='avviso-operativo'>"
+
"È consigliabile avviarsi verso il punto di prelievo."
+
"</strong>";

}


testo +=

"<br><br>Prossima corsa tra "
+
minuti
+
" minuti:"
+
"<br>"
+
"Da "
+
"<span class='indirizzo-assistente'>"
+
prossima.partenza
+
"</span>"
+
" verso "
+
"<span class='indirizzo-assistente'>"
+
prossima.destinazione
+
"</span>";



}



if(turno){


let minutiTurno =

Math.floor(

(
Date.now()
-
turno.inizio
)
/60000

);



let ore =

Math.floor(
minutiTurno / 60
);



let minuti =

minutiTurno % 60;



testo +=


"<br><br>Turno attivo da: "
+
ore
+
" ore e "
+
minuti
+
" minuti";


}
else{


testo +=

"<br><br>Nessun turno attivo.";

}




box.innerHTML =
testo;


}

// ======================================================
// TAXIPILOT - BLACKLIST CLIENTI
// ======================================================


let clientiBlacklist = JSON.parse(
    localStorage.getItem("taxipilot_blacklist")
) || [];




// MOSTRA FORM BLACKLIST

function mostraFormBlacklist(){

    let form =
    document.getElementById(
        "formBlacklist"
    );


    if(form){

        form.style.display = "block";

    }

}




// SALVA CLIENTE BLACKLIST

function salvaBlacklist(){


    let nome =
    document.getElementById(
        "nomeBlacklist"
    ).value;


    let telefono =
    document.getElementById(
        "telefonoBlacklist"
    ).value;


    let tratta =
    document.getElementById(
        "trattaBlacklist"
    ).value;


    let motivo =
    document.getElementById(
        "motivoBlacklist"
    ).value;



    if(
        !nome ||
        !telefono
    ){

        alert(
            "Inserisci almeno nome e telefono del cliente"
        );

        return;

    }



    let cliente = {


        id:
        Date.now(),


        nome:
        nome,


        telefono:
        telefono,


        tratta:
        tratta,


        motivo:
        motivo,


        data:
        new Date()
        .toLocaleDateString(
            "it-IT"
        )


    };



    clientiBlacklist.push(
        cliente
    );



    localStorage.setItem(

        "taxipilot_blacklist",

        JSON.stringify(
            clientiBlacklist
        )

    );



    alert(
        "Cliente aggiunto alla blacklist"
    );



    document.getElementById(
        "nomeBlacklist"
    ).value="";


    document.getElementById(
        "telefonoBlacklist"
    ).value="";


    document.getElementById(
        "trattaBlacklist"
    ).value="";



    mostraBlacklist();


}







// MOSTRA LISTA BLACKLIST


function mostraBlacklist(){


    let box =
    document.getElementById(
        "listaBlacklist"
    );


    if(!box){

        return;

    }



    box.innerHTML="";



    if(
        clientiBlacklist.length===0
    ){

        box.innerHTML=

        `
        <p class="empty">
        Nessun cliente bloccato
        </p>
        `;


        return;

    }






    clientiBlacklist.forEach(

    cliente=>{


        box.innerHTML +=


        `

        <div class="trip-card">


        <h3>
        ${cliente.nome}
        </h3>


        <p>
        Telefono:
        ${cliente.telefono}
        </p>


        <p>
        Tratta:
        ${cliente.tratta || "Non indicata"}
        </p>


        <p>
        Motivo:
        ${cliente.motivo}
        </p>


        <p>
        Inserito:
        ${cliente.data}
        </p>



        <button

        class="delete-btn"

        onclick="eliminaBlacklist(${cliente.id})"

        >

        Elimina

        </button>



        </div>

        `;


    });


}








// ELIMINA CLIENTE


function eliminaBlacklist(id){


    if(
        !confirm(
        "Eliminare questo cliente dalla blacklist?"
        )
    ){

        return;

    }



    clientiBlacklist =

    clientiBlacklist.filter(

    cliente =>

    cliente.id !== id

    );




    localStorage.setItem(

        "taxipilot_blacklist",

        JSON.stringify(
            clientiBlacklist
        )

    );



    mostraBlacklist();


}






// AVVIO PAGINA BLACKLIST

document.addEventListener(

"DOMContentLoaded",

()=>{


    mostraBlacklist();


}

);

function controllaAeroporto(){

let partenza =
document.getElementById("partenza")?.value.toLowerCase();


let blocco =
document.getElementById("bloccoVolo");


if(!blocco){
    return;
}


if(
partenza.includes("aeroporto")
){

blocco.style.display="block";

}

else{

blocco.style.display="none";

document.getElementById("numeroVolo").value="";

}


}

function monitoraVolo(numeroVolo){

    if(!numeroVolo){
        return;
    }


    let url =
    "https://www.flightradar24.com/data/flights/"
    +
    numeroVolo.toLowerCase();


    window.open(
        url,
        "_blank"
    );

}

// =====================================
// INSERIMENTO VOCALE TAXIPILOT
// =====================================
let riconoscimentoVocale = null;

function avviaInserimentoVocale(){


if(!("webkitSpeechRecognition" in window)){


alert(
"Il riconoscimento vocale non è disponibile su questo dispositivo"
);

return;

}



riconoscimentoVocale =
new webkitSpeechRecognition();


let recognition =
riconoscimentoVocale;



recognition.lang =
"it-IT";


recognition.continuous =
false;


recognition.interimResults =
false;



let box =
document.getElementById(
"risultatoVoce"
);



box.innerHTML =
"Sto ascoltando...";
document.getElementById(
"annullaVoce"
).style.display = "block";


recognition.start();




recognition.onresult =
function(event){


let testo =
event.results[0][0].transcript;



box.innerHTML =

"Testo ricevuto:<br><b>"
+
testo
+
"</b>";



analizzaVoceCorsa(testo);



};



recognition.onerror =
function(){

box.innerHTML =
"Errore nel riconoscimento vocale";

};


}




function analizzaVoceCorsa(testo){

let frase = testo.toLowerCase().trim();


// =======================
// CLIENTE
// =======================

let cliente = frase
.replace(/inserisci corsa/,"")
.replace(/cliente/,"")
.split(" telefono")[0]
.split(" da ")[0]
.trim();


if(cliente){

document.getElementById("nomeCliente").value =
cliente
.split(" ")
.map(
p=>p.charAt(0).toUpperCase()+p.slice(1)
)
.join(" ");

}




// =======================
// TELEFONO
// =======================

let telefono =
frase.match(/\d{9,10}/);


if(telefono){

document.getElementById("telefono").value =
telefono[0];

}




// =======================
// IMPORTO
// =======================

let prezzo =
frase.match(
/(\d+)\s*(euro|€)/
);


if(prezzo){

document.getElementById("importo").value =
prezzo[1];

}




// =======================
// ORARIO
// =======================

let orario = "";


let oraNumero =
frase.match(
/alle\s+(\d{1,2})(?:\s*e\s*(30|trenta))?/
);


if(oraNumero){


orario =
oraNumero[1].padStart(2,"0")
+
(
oraNumero[2]
?
":30"
:
":00"
);


document.getElementById("orario").value =
orario;


}





// =======================
// RIMOZIONE ORARIO DALLA FRASE
// =======================

let frasePulita =
frase.replace(
/alle\s+\d{1,2}(\s*e\s*(30|trenta))?/,
""
);





// =======================
// PARTENZA E DESTINAZIONE
// =======================

if(
frasePulita.includes(" da ")
&&
frasePulita.includes(" a ")
){


let dati =
frasePulita.split(" da ")[1];


let parti =
dati.split(" a ");



let partenza =
parti[0].trim();


let destinazione =
parti[1].trim();





document.getElementById("partenza").value =
partenza;



document.getElementById("destinazione").value =
destinazione;



controllaAeroporto();


}





// =======================
// AEROPORTO
// =======================


if(
frase.includes("aeroporto")
){


let blocco =
document.getElementById(
"bloccoVolo"
);


if(blocco){

blocco.style.display="block";

}


}





document.getElementById(
"risultatoVoce"
).innerHTML =

"✅ Dati inseriti:<br><b>"
+
testo
+
"</b>";



}

function annullaInserimentoVocale(){


if(riconoscimentoVocale){

riconoscimentoVocale.stop();

}


let box =
document.getElementById(
"risultatoVoce"
);


if(box){

box.innerHTML =
"";

}



let pulsante =
document.getElementById(
"annullaVoce"
);



if(pulsante){

pulsante.style.display =
"none";

}



}
