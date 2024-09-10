"use strict";

const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";

// Función para crear un nav
function crearNav() {
  const nav = document.createElement("nav");
  nav.classList.add("nav-bar");

  // Crear dos imgs que van dentro del nav
  const navImg = document.createElement("img");
  navImg.src =
    "https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon.png";
  navImg.alt = "Logo";

  const navImg2 = document.createElement("img");
  navImg2.src =
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png";
  navImg2.alt = "Logo2";
  navImg2.classList.add("logo2");

  // Agregar las imagenes al nav
  nav.appendChild(navImg);
  nav.appendChild(navImg2);

  // Agregar el nav al cuerpo del documento
  document.body.prepend(nav);
}

// Función para mostrar los primeros 150 Pokémon en el contenedor
function mostrarPokemones(pokemones) {
  const container = document.getElementById("container");

  // Limpiar el contenido del contenedor antes de agregar los nuevos Pokémon
  container.innerHTML = "";

  // Iterar sobre los primeros 150 pokemones
  pokemones.slice(0, 150).forEach((pokemon, index) => {
    // Crear un nuevo elemento div para cada Pokémon
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");

    // Crear el elemento h2 para el nombre del Pokémon
    const pokemonName = document.createElement("h3");
    pokemonName.textContent = `${pokemon.name} # ${index + 1}`;

    // Crear el elemento img para la imagen del Pokémon
    const pokemonImg = document.createElement("img");
    pokemonImg.classList.add("imgs");

    fetch(pokemon.url)
      .then((response) => response.json())
      .then((data) => {
        pokemonImg.src = data.sprites.front_default;
        pokemonImg.alt = `Imagen de ${pokemon.name}`;
      })
      .catch((error) => {
        console.error("Error al obtener la imagen del Pokémon:", error);
      });

    // Agregar el h2 y la imagen al div del Pokémon
    pokemonDiv.appendChild(pokemonName);
    pokemonDiv.appendChild(pokemonImg);

    // Agregar el div al contenedor
    container.appendChild(pokemonDiv);
  });
}

// Función para obtener los datos de la API
function obtenerData() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      return response.json();
    })
    .then((data) => {
      // Llamar a la función para mostrar los primeros 150 Pokémon
      mostrarPokemones(data.results);
    })
    .catch((error) => {
      console.error("Hubo un error al consumir la API:", error);
    });
}

// Crear la barra de navegación
crearNav();

// Llamar a la función para obtener y mostrar los Pokémon
obtenerData();
