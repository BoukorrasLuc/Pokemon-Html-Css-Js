let allPokemon = [];
let arrayEnd = [];

const searchInput = document.querySelector(".recherche-poke input");
const listPoke = document.querySelector(".list-poke");
const loader = document.querySelector(".loader");

const types = {
  grass: "#78c850",
  ground: "#E2BF65",
  dragon: "#6F35FC",
  fire: "#F58271",
  electric: "#F7D02C",
  fairy: "#D685AD",
  poison: "#966DA3",
  bug: "#B3F594",
  water: "#6390F0",
  normal: "#D9D5D8",
  psychic: "#F95587",
  flying: "#A98FF3",
  fighting: "#C25956",
  rock: "#B6A136",
  ghost: "#735797",
  ice: "#96D9D6",
};

function fectPokemondata() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then((allPoke) => {
      // console.log(allPoke);
      allPoke.results.forEach((pokemon) => {
        fecthPokemonFull(pokemon);
      });
    });
}
fectPokemondata();

function fecthPokemonFull(pokemon) {
  let objPokemonFull = {};
  let url = pokemon.url;
  let nameP = pokemon.name;

  fetch(url)
    .then((response) => response.json())
    .then((PokeData) => {
      // console.log(PokeData);
      objPokemonFull.pic = PokeData.sprites.front_default;
      objPokemonFull.type = PokeData.types[0].type.name;
      objPokemonFull.id = PokeData.id;

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
        .then((response) => response.json())
        .then((PokeData) => {
          // console.log(PokeData);
          objPokemonFull.name = PokeData.names[4].name;
          allPokemon.push(objPokemonFull);
          if (allPokemon.length === 151) {
            console.log(allPokemon);
            arrayEnd = allPokemon
              .sort((a, b) => {
                return a.id - b.id;
              })
              .slice(0, 21);
            createCard(arrayEnd);
            loader.style.display = "none";
          }
        });
    });
}

// Création des cartes

function createCard(arr) {
  for (let i = 0; i < arr.length; i++) {
    const card = document.createElement("li");
    let color = types[arr[i].type];
    card.style.background = color;
    const txtCard = document.createElement("h5");
    txtCard.innerText = arr[i].name;
    const idCard = document.createElement("p");
    idCard.innerText = `ID# ${arr[i].id}`;
    const imgCard = document.createElement("img");
    imgCard.src = arr[i].pic;

    card.appendChild(imgCard);
    card.appendChild(txtCard);
    card.appendChild(idCard);

    listPoke.appendChild(card);
  }
}

// Scroll Infini

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 20) {
    addPoke(6);
  }
});

let index = 21;

function addPoke(nb) {
  if (index > 151) {
    return;
  }
  const arrToAdd = allPokemon.slice(index, index + nb);
  createCard(arrToAdd);
  index += nb;
}
// Recherche

searchInput.addEventListener("keyup", recherche);

// const formRecherche = document.querySelector("form");
// formRecherche.addEventListener("submit", (e) => {
//   e.preventDefault();
//   recherche();
// });

function recherche() {
  if (index < 151) {
    addPoke(130);
  }
  let filter, allLi, titleValue, AllTitles;
  filter = searchInput.value.toUpperCase();
  allLi = document.querySelectorAll("li");
  AllTitles = document.querySelectorAll("li > h5");

  for (i = 0; i < allLi.length; i++) {
    titleValue = AllTitles[i].innerText;

    if (titleValue.toUpperCase().indexOf(filter) > -1) {
      allLi[i].style.display = "flex";
    } else {
      allLi[i].style.display = "none";
    }
  }
}

// Animation Input

searchInput.addEventListener("input", function (e) {
  if (e.target.value !== "") {
    e.target.parentNode.classList.add("active-input");
  } else if (e.target.value === "") {
    e.target.parentNode.classList.remove("active-input");
  }
});
