const pokebola = document.getElementById("pokebola");
    pokebola.addEventListener("click", () => {
        pokebola.classList.add("shake");
        setTimeout(() => {
            pokebola.classList.remove("shake");
            getSortear();
        }, 500);

});


async function getSortear(){
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    const geo = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
    const geoData = await geo.json();
    const location = geoData.address.city || geoData.address.town || geoData.address.village || "uma localização desconhecida";
    const estado = geoData.address.state || "um estado desconhecido";

    let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+ Math.floor(Math.random() * 151 + 1));
    let data = await response.json();

    document.getElementById("Sortear").innerHTML = `
    <p> Pokébola encontrada em ${location}, ${estado}!</p>
    <h2>O Pokémon encontrado é:</h2>
    <img class="imagempokemon" src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
    <p class="nomepokemon">${data.name}</p>
  `;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado com sucesso!'))
    .catch(err => console.log('Falha ao registrar o Service Worker:', err));
}