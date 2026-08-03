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


        orario:
        orario,


        importo:
        importo,


        stato:
        "Programmata",



        data:
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



}









function salvaCorse(){


    localStorage.setItem(

        "taxipilot_corse",

        JSON.stringify(
            corse
        )

    );


}









// ===============================
// MOSTRA CORSE
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






    let lista =
    [...corse];



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

        ${corsa.importo.toFixed(2)}
        €

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

        Chiama

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






    box.innerHTML =


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

    →

    ${corsa.destinazione}

    </p>



    <strong>

    ${corsa.importo.toFixed(2)}

    €

    </strong>



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
    ).value;



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
        Number(km)

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

        "Inserisci chilometri finali"

    );
localStorage.setItem(
    "taxipilot_ultimo_km",
    kmFinali
);


    if(!kmFinali){

        return;

    }




    kmFinali =
    Number(kmFinali);

localStorage.setItem(

    "taxipilot_ultimo_km",

    kmFinali

);



    let kmPercorsi =

    kmFinali -

    turno.kmInizio;





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

    corsa.data === oggi

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
){


window.location.href =
"aggiornamento.html";


}


});


});


});

}

function iniziaTaxiPilot(){


    localStorage.setItem(
        "taxipilot_benvenuto",
        "true"
    );


    window.location.href =
    "index.html";


}
