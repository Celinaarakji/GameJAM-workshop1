const form = document.querySelector('#search-form');
const queryInput = document.querySelector('#pokemon-query');
const searchButton = document.querySelector('#search-button');
const statusText = document.querySelector('#status');
const result = document.querySelector('#result');
const nameText = document.querySelector('#pokemon-name');
const image = document.querySelector('#pokemon-image');
const heightText = document.querySelector('#pokemon-height');
const cache = new Map(); // Reuse successful searches during this page visit.

async function loadPokemon(query) {
  const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}/`;
  // fetch asks the API for data about the Pokémon in the URL.
  const response = await fetch(url);
  // A response can arrive even when that Pokémon does not exist.
  if (!response.ok) {
    throw new Error('Pokémon not found.');
  }
  // JSON turns the response data into an object our code can read.
  return await response.json();
}

function showPokemon(pokemon) {
  // pokemon holds the data returned by the API.
  // textContent controls the text shown inside an element on the page.
  nameText.textContent = pokemon.name;

  // TODO: display the Pokémon's height instead of the question mark.
  // pokemon.height is its height in decimetres (10 decimetres = 1 metre).
  heightText.textContent = '?';

  const sprite = pokemon.sprites.front_default;
  image.hidden = !sprite;
  if (sprite) {
    image.src = sprite;
    image.alt = `Sprite of ${pokemon.name}`;
  } else {
    image.removeAttribute('src');
    image.alt = '';
  }
  result.hidden = false;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Keep the page open when the form submits.
  const query = queryInput.value.trim().toLowerCase();
  result.hidden = true;
  if (!query) {
    statusText.textContent = 'Enter a Pokémon name or number.';
    return;
  }
  searchButton.disabled = true;
  statusText.textContent = 'Searching…';
  try {
    let pokemon = cache.get(query);
    if (!pokemon) {
      pokemon = await loadPokemon(query);
      cache.set(query, pokemon);
    }
    showPokemon(pokemon);
    statusText.textContent = 'Found it! Try another Pokémon.';
  } catch (error) {
    statusText.textContent = 'Could not find that Pokémon. Check the spelling and your internet connection, then try again.';
  } finally {
    searchButton.disabled = false;
  }
});
