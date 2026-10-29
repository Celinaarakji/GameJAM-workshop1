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
  // TODO 1: request url with fetch, check response.ok, then return response.json().
  // A response with ok === false should throw new Error('Pokémon not found.');
  // Replace the temporary error below with your code.
  throw new Error('TODO 1: connect the API in explorer.js.');
}

function showPokemon(pokemon) {
  // TODO 2: show pokemon.name by assigning it to nameText.textContent.
  nameText.textContent = 'TODO 2: show the Pokémon name';
  heightText.textContent = `${pokemon.height / 10} m`;
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
    statusText.textContent = error.message.startsWith('TODO')
      ? error.message
      : 'Could not find that Pokémon. Check the spelling and your internet connection, then try again.';
  } finally {
    searchButton.disabled = false;
  }
});
