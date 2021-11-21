import './App.css';
import Landing from './components/Landing.jsx';
import {Route} from "react-router-dom";
import Nav from './components/Nav.jsx';
import React, { useState, useEffect } from 'react';
import PokeContainer from './components/PokeContainer.jsx';

import axios from "axios";
import Card from './components/Card';
import Pagination from './components/Pagination';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonFragment, setPokemonFragment] = useState([]);
  const [pag, setPag] = useState(1);

  useEffect(() => {
    (async() => {
      const pokemons = await axios("http://localhost:3001/pokemons");
      setPokemons(pokemons.data);
    })()    
  }, []);

  // fragmenta el array de pokemons para tener 12
  useEffect(() => {
    setPokemonFragment(pokemons.slice(
      (pag - 1) * 12,
      pag * 12
    ))
  }, [pokemons, pag]);

  return (
    <div className="App">
      {/* <Route exact path="/">
        <Landing/>
      </Route> */}

      <Route path="/pokemons">
        <Nav/>
      
        <PokeContainer class_name="pokeContainer">
          {pokemonFragment.length > 0 ? pokemonFragment?.map(p => <Card key={p?.name} name={p?.name} image={p?.sprite} types={p?.types}/>) : "cargando"}
        </PokeContainer>
        
        <Pagination pag={pag} total={Math.ceil(pokemons.length/12)} onChange={(newPage) => setPag(newPage)}/>
      </Route>

    </div>
  );
}

export default App;
