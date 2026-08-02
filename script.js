// ======================================================
// TaxiPilot
// BLOCCO 1/5
// ACCESSO DISPOSITIVO + PROFILO + LOGIN
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




// ===============================
// CONTROLLO PRIMO ACCESSO
// ===============================


function controlloAccesso(){


    let configurato =
    localStorage.getItem(
        "taxipilot_configurato"
    );



    let pagina =
    window.location.pathname;



    let login =
    pagina.includes("login.html");



    if(
        !configurato &&
        !login
    ){

        window.location.replace(
            "login.html"
        );

        return;

    }



    if(
        configurato &&
        login
    ){

        window.location.replace(
            "index.html"
        );

        return;

    }


}







// ===============================
// PRIMO ACCESSO LOGIN
// ===============================



function aggiungiContattoLogin(){


    let nome =
    prompt(
        "Nome contatto SOS"
    );



    let numero =
    prompt(
        "Numero telefono"
    );



    if(
        !nome ||
        !numero
    ){

        return;

    }



    let contatto = {


        id:
        Date.now(),


        nome:
        nome,


        telefono:
        numero


    };



    contattiSOS.push(
        contatto
    );



    localStorage.setItem(

        "taxipilot_contatti_sos",

        JSON.stringify(contattiSOS)

    );



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



    contattiSOS.forEach(
        contatto=>{


        box.innerHTML += `

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


        creato:
        new Date().toLocaleDateString(
            "it-IT"
        )


    };





    localStorage.setItem(

        "taxipilot_profilo",

        JSON.stringify(profiloTaxi)

    );





    localStorage.setItem(

        "taxipilot_contatti_sos",

        JSON.stringify(contattiSOS)

    );





    localStorage.setItem(

        "taxipilot_configurato",

        "true"

    );





    window.location.replace(
        "index.html"
    );


}









// ===============================
// CARICAMENTO PROFILO
// ===============================



function caricaNomeHome(){


    let elemento =
    document.getElementById(
        "nomeAutista"
    );



    if(
        !elemento
    ){

        return;

    }





    if(
        profiloTaxi
    ){

        elemento.innerHTML =
        profiloTaxi.nome;

    }


}







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





    for(
        let id in campi
    ){


        let campo =
        document.getElementById(
            id
        );



        if(
            campo
        ){

            campo.value =
            campi[id];

        }


    }


}







function salvaProfiloCompleto(){



    profiloTaxi = {


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

        JSON.stringify(profiloTaxi)

    );



    alert(
        "Profilo salvato"
    );



}

// ======================================================
// TaxiPilot
// BLOCCO 2/5
// SISTEMA SOS
// ======================================================



// ===============================
// AGGIUNTA CONTATTO SOS
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





    let nuovoContatto = {


        id:
        Date.now(),


        nome:
        nome,


        telefono:
        telefono



    };





    contattiSOS.push(
        nuovoContatto
    );





    localStorage.setItem(

        "taxipilot_contatti_sos",

        JSON.stringify(contattiSOS)

    );





    mostraListaSOS();

    mostraContattiProfilo();



}







// ===============================
// VISUALIZZA CONTATTI SOS
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





    box.innerHTML = "";





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
// VISUALIZZA IN PROFILO
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





    localStorage.setItem(

        "taxipilot_contatti_sos",

        JSON.stringify(contattiSOS)

    );





    mostraListaSOS();

    mostraContattiProfilo();



}








// ===============================
// ATTIVAZIONE SOS
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






    let conferma =
    confirm(

        "Inviare richiesta di emergenza?"

    );



    if(
        !conferma
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





            inviaMessaggioSOS(
                lat,
                lng
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

    contatto=>{


        let numero =

        contatto.telefono
        .replace(
            /\s/g,
            ""
        );




        let url =


        `https://wa.me/${numero}?text=${testo}`;





        window.open(

            url,

            "_blank"

        );



    }


    );



}

// ======================================================
// TaxiPilot
// BLOCCO 3/5
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



    let importo =
    Number(
        document.getElementById(
            "importo"
        ).value
    ) || 0;






    if(
        !cliente ||
        !partenza ||
        !destinazione ||
        !orario
    ){


        alert(
            "Compila tutti i campi obbligatori"
        );


        return;


    }







    let nuovaCorsa = {


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


        orario:
        orario,


        importo:
        importo,


        stato:
        "Programmata",


        data:
        new Date().toLocaleDateString(
            "it-IT"
        )


    };







    corse.push(
        nuovaCorsa
    );





    salvaCorse();



    svuotaForm();



    mostraCorse();



    mostraProssimaCorsa();



    aggiornaStatistiche();



}







function salvaCorse(){



    localStorage.setItem(

        "taxipilot_corse",

        JSON.stringify(corse)

    );


}









// ===============================
// VISUALIZZA CORSE
// ===============================


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







    let lista = [...corse];



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

onclick="cambiaStatoCorsa(${corsa.id})"

>

Cambia stato

</button>







<button

class="main-button"

onclick="chiamaCliente('${corsa.telefono}')"

>

Chiama cliente

</button>







<button

class="main-button"

onclick="navigaCorsa('${corsa.destinazione}')"

>

Naviga

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
// CAMBIO STATO CORSA
// ===============================



function cambiaStatoCorsa(id){



    let corsa =

    corse.find(

        c =>

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
// CHIAMATA CLIENTE
// ===============================



function chiamaCliente(numero){



    if(!numero){

        alert(
            "Numero non disponibile"
        );

        return;

    }



    window.location.href =

    "tel:" + numero;



}









// ===============================
// NAVIGAZIONE
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









// ===============================
// PULIZIA FORM
// ===============================



function svuotaForm(){



    let campi = [


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



        if(campo){

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



    if(!box){

        return;

    }






    let disponibili =


    corse.filter(

        c =>

        c.stato !== "Completata"

    );






    if(
        disponibili.length===0
    ){


        box.innerHTML=

        `

        <p>

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







    box.innerHTML=

    `

<div class="trip-box">


<div class="trip-time">

${corsa.orario}

</div>



<div class="trip-info">


<h3>

${corsa.cliente}

</h3>



<p>

${corsa.partenza}

↓

${corsa.destinazione}

</p>



<strong>

${corsa.importo.toFixed(2)} €

</strong>



</div>


</div>

`;



}

// ======================================================
// TaxiPilot
// BLOCCO 4/5
// TURNO + STATISTICHE + STATO SERVIZIO
// ======================================================



// ===============================
// GESTIONE TURNO
// ===============================



function iniziaTurno(){



    let km =
    document.getElementById(
        "kmInizio"
    ).value;





    if(
        km === ""
    ){


        alert(
            "Inserisci i chilometri iniziali"
        );


        return;


    }






    let turno = {



        attivo:
        true,



        inizio:
        Date.now(),



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

    document.getElementById(
        "statoTurno"
    );



    if(!box){

        return;

    }







    let turno =

    JSON.parse(

        localStorage.getItem(
            "taxipilot_turno"
        )

    );







    if(
        !turno ||
        !turno.attivo
    ){



        box.innerHTML=

        `

        <p class="empty">

        Nessun turno attivo

        </p>


        `;


        return;


    }







    let ora =

    new Date(
        turno.inizio
    )

    .toLocaleTimeString(
        "it-IT",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );







    box.innerHTML=

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



<p>

Ore lavorate:

<span id="oreTurno">

0

</span>

</p>



</div>


`;




    aggiornaOreTurno();



}









function aggiornaOreTurno(){



    let box =

    document.getElementById(
        "oreTurno"
    );



    if(!box){

        return;

    }







    let turno =

    JSON.parse(

        localStorage.getItem(
            "taxipilot_turno"
        )

    );





    if(
        !turno
    ){

        return;

    }






    let differenza =

    Date.now()

    -

    turno.inizio;







    let ore =

    Math.floor(

        differenza /

        3600000

    );







    box.innerHTML =
    ore;



}









function terminaTurno(){



    let conferma =

    confirm(

        "Terminare il turno?"

    );





    if(
        !conferma
    ){

        return;

    }







    localStorage.removeItem(

        "taxipilot_turno"

    );






    mostraTurno();




}









// ===============================
// STATO SERVIZIO
// ===============================



function cambiaStato(){



    let stato =

    localStorage.getItem(

        "taxipilot_stato"

    )

    ||

    "Disponibile";







    let pulsante =

    document.getElementById(
        "statoServizio"
    );





    if(
        pulsante
    ){

        pulsante.innerHTML =
        stato;

    }



}









function cambiaStatoServizio(){



    let attuale =

    localStorage.getItem(

        "taxipilot_stato"

    )

    ||

    "Disponibile";






    let nuovo;



    if(
        attuale === "Disponibile"
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
// STATISTICHE HOME
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

        corsa.data === oggi

    );







    let incasso =


    corseOggi.reduce(

        (totale,corsa)=>

        totale +

        Number(
            corsa.importo
        ),

        0

    );







    boxCorse.innerHTML =

    corseOggi.length;







    boxIncasso.innerHTML =


    incasso.toFixed(2)

    +

    " €";



}









// ===============================
// AGGIORNAMENTO ORE AUTOMATICO
// ===============================



setInterval(

()=>{


    aggiornaOreTurno();


},

60000

);

// ======================================================
// TaxiPilot
// BLOCCO 5/5
// AVVIO APPLICAZIONE
// ======================================================



// ===============================
// APERTURA FORM CORSA
// ===============================



function openForm(){



    let form =

    document.getElementById(
        "formCorsa"
    );



    if(
        !form
    ){

        return;

    }





    form.classList.toggle(
        "hidden"
    );


}









// ===============================
// CARICAMENTO COMPLETO APP
// ===============================



document.addEventListener(

"DOMContentLoaded",

()=>{



    // controllo login dispositivo

    controlloAccesso();




    // HOME

    caricaNomeHome();

    aggiornaStatistiche();

    mostraProssimaCorsa();

    cambiaStato();




    // CORSE

    mostraCorse();




    // SOS

    mostraListaSOS();

    mostraContattiProfilo();




    // PROFILO

    caricaProfiloCompleto();




    // TURNO

    mostraTurno();



}

);
