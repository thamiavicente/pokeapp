import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.css'


export default function App() {
  const [pokedex, setPokedex] = useState([]);
  const [wildPokemon, setWildPokemon] = useState({});

  useEffect(() =>{
    encounterWildPokemon();
  }, []);

  const pokeId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(151);
    return Math.floor(Math.random()* (max - min + 1)) + min;
  }

  const encounterWildPokemon = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/' + pokeId()) 
      .then (response => {
        setWildPokemon(response.data);
      })
  }

  const catchPokemon = (pokemon) => {
    const pokemonCatched = [];
    setPokedex(state => {
      const pokemonExists = (state.filter(p => pokemon.id === p.id).length > 0);

      if (!pokemonExists) {
        state = [...state, pokemon]
        state.sort(function (a, b) {
          return a.id - b.id
        })
        pokemonCatched.push(pokemon);
        console.log(pokemon);
      }
      return state
    })
    localStorage.setItem('pokemonsCatched', pokemonCatched);
    encounterWildPokemon();
  }

  const releasePokemon = id => {
    setPokedex(state => state.filter(p => p.id !== id))
    // localStorage.removeItem();
  }

  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title">Pokedex</h1>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <section className="wild-pokemon">
        <h2>Wild Encouter</h2>
        <h4>{wildPokemon.name}</h4>
        <img className="sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"} alt={wildPokemon.name} />
        <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CAPTURAR</button>
      </section>

      <section className="pokedex">
        <h2>Pokedex</h2>
        <div className="pokedex-list">
          {pokedex.map(pokemon => (
            <div className="pokemon" key={pokemon.id}>
              <h4 className="pokemon-name">{pokemon.name}</h4>
              <img className="sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} alt={pokemon.name} />
              <button className="remove" onClick={() => releasePokemon(pokemon.id)}>LIBERTAR</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
