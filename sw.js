const cacheName = "taxipilot-v1";


const files = [

"index.html",
"login.html",
"profilo.html",
"sos.html",
"turno.html",
"corse.html",

"style.css",
"script.js",
"logo1.png"

];



self.addEventListener(
"install",
event=>{

self.skipWaiting();
  
event.waitUntil(

caches.open(cacheName)

.then(cache=>{

return cache.addAll(files);

})

);


});

self.addEventListener(
"activate",
event=>{


event.waitUntil(

caches.keys()

.then(keys=>{


return Promise.all(

keys.map(key=>{


if(
key !== cacheName
){

return caches.delete(key);

}


})

);


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
