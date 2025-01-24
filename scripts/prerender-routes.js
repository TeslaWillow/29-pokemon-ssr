/*
  /pokemons/1
  /pokemons/page/1
  /pokemons/page/2
  /pokemons/page/3
  /pokemons/page/4
  /pokemons/page/5
  /pokemon/pikachu
*/

const TOTAL_POKEMONS = 20;
const TOTAL_PAGES = 5;

(async()=>{
  const fs = require('fs');

  const pokemonIds    = Array.from({length: TOTAL_POKEMONS}, (_, i) => i + 1);
  const pokemonsPages = Array.from({length: TOTAL_PAGES}, (_, i) => i + 1);

  let fileContent = pokemonIds.map( (id) => `/pokemons/${id}` ).join('\n');
  fileContent += '\n';
  fileContent += pokemonsPages.map( (page) => `/pokemons/page/${page}` ).join('\n');

  // Routes by name
  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    .then( res => res.json() );

  fileContent += '\n';
  fileContent += pokemonNameList.results.map( (pokemon) => `/pokemon/${pokemon.name}` ).join('\n');

  fs.writeFileSync('routes.txt', fileContent);
})();
