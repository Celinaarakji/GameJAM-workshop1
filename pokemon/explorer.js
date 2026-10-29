const form = document.querySelector('#search-form');
const queryInput = document.querySelector('#pokemon-query');
const searchButton = document.querySelector('#search-button');
const statusText = document.querySelector('#status');
const result = document.querySelector('#result');
const nameText = document.querySelector('#pokemon-name');
const image = document.querySelector('#pokemon-image');
const heightText = document.querySelector('#pokemon-height');
const weightText = document.querySelector('#pokemon-weight');
const numberText = document.querySelector('#pokemon-number');
const typeText = document.querySelector('#pokemon-type');
const randomButton = document.querySelector('#random-button');
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
  // Syntax example — adapt the attribute and divisor; this is not a real API field:
  // heightText.textContent = (pokemon.attribute / divisor) + ' m';
  heightText.textContent = '?';

  // OPTIONAL TODO 2: display weight in kilograms.
  // Find the field in the API response. 10 hectograms = 1 kilogram.
  // weightText.textContent = (pokemon.attribute / divisor) + ' kg';
  weightText.textContent = '?';

  // OPTIONAL TODO 3: display the Pokémon's Pokédex number.
  // numberText.textContent = pokemon.attribute;
  numberText.textContent = '?';

  // OPTIONAL TODO 4: display its first type (for example, electric).
  // types is an array. [0] reads its first item, which contains a type object.
  // Syntax example for nested data: object.list[0].detail.attribute
  typeText.textContent = '?';

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

// OPTIONAL TODO 5: make the Random Pokémon button search for an ID from 1 to 151.
// queryInput.value is the text in the search box.
// Math.random() produces a number from 0 up to (but not including) 1.
// Math.floor(number) rounds down. form.requestSubmit() submits the search form.
// Syntax example with a different range: Math.floor(Math.random() * 6) + 1
randomButton.addEventListener('click', () => {
  // Your random search code goes here.
});
