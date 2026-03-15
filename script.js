const pokebola = document.getElementById("pokebola");
    pokebola.addEventListener("click", () => {
        pokebola.classList.add("shake");
        setTimeout(() => {
            pokebola.classList.remove("shake");
            getSortear();
        }, 500);

});

async function getSortear(){
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+ Math.floor(Math.random() * 151 + 1));
    let data = await response.json();



    let name = data.name;
    let image = data.sprites.other["official-artwork"].front_default;

    
    
    document.getElementById("Sortear").innerHTML = `
    <h2>O Pokémon encontrado é:</h2>
    <img class="imagempokemon" src="${image}" alt="${name}">
    <p class="nomepokemon">${name}</p>
  `;
}