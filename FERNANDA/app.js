const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
  (fetch(getPokemonUrl(index + 1)).then(response => response.json()))
)

const generateHTML = pokemons => {
  return pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    accumulator += `
      <li class="card ${elementTypes[0]}">
      <img class="card-image alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"</img>
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementTypes.join(" | ")}</p>
      </li>
    `
    return accumulator
  }, "")
}

const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokecard"]')
  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)





// Modelo Git Thami ...

//import React from 'react';
//import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

//ReactDOM.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//  document.getElementById('root')
//);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();