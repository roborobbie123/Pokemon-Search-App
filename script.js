const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const type = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const image = document.getElementById("sprite");

const fetchData = async (name) => {
  try {
    let flag = false;
    const res = await fetch(pokemonAPI);
    const data = await res.json();
    for (let i = 0; i < data.results.length; i++) {
      if (parseInt(name) === data.results[i].id || name === data.results[i].name ) {
        let moreInfo = data.results[i].url;
        const res2 = await fetch(moreInfo);
        const data2 = await res2.json();
        pokemonName.textContent = data2.name.toUpperCase();
        pokemonId.textContent = "#" + data2.id;
        weight.textContent = "Weight: " + data2.weight;
        height.textContent = "Height: " + data2.height;
        image.src = data2.sprites.front_default;
        hp.textContent = data2.stats[0].base_stat;
        attack.textContent = data2.stats[1].base_stat;
        defense.textContent = data2.stats[2].base_stat;
        spAttack.textContent = data2.stats[3].base_stat;
        spDefense.textContent = data2.stats[4].base_stat;
        speed.textContent = data2.stats[5].base_stat;
        type.textContent = "";
        for(let i = 0; i < data2.types.length; i++) {
          type.innerHTML += `<p>${data2.types[i].type.name.toUpperCase()}</p>`;
        }
        flag = true;
      } 
    }
    if (flag === false) {
      alert("Pokémon not found");
      return;
    }
  } catch (err){
    alert("Pokémon not found");
  }
}

searchBtn.addEventListener("click", () => {
  const search = input.value;
  if(!search) {
    alert("Pokémon not found");
    return; 
  }
  fetchData(typeof(search) === "string" ? search.toLowerCase() : search);
  
})


const resetPage = () => {
  input.value = ""
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  image.src = "";
  type.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  spAttack.textContent = "";
  spDefense.textContent = "";
  speed.textContent = "";
}