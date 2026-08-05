const cacheName = "taxipilot-v48";


const files = [

"index.html",
"login.html",
"profilo.html",
"sos.html",
"turno.html",
"corse.html",
"aggiornamento.html",

"style.css",
"script.js",
"logo.png"

];



self.addEventListener(
"install",
event=>{


  
event.waitUntil(

caches.open(cacheName)

.then(cache=>{

return cache.addAll(files);

})

);


});



self.addEventListener(
"fetch",
event=>{


event.respondWith(

caches.match(event.request)

.then(response=>{

return response || fetch(event.request);

})

);


});

self.addEventListener(
"activate",
event=>{

event.waitUntil(

caches.keys()

.then(cacheNames=>{

return Promise.all(

cacheNames.map(cache=>{

if(cache !== cacheName){

return caches.delete(cache);

}

})

);

})

.then(()=>{

return clients.claim();

})

);

});
