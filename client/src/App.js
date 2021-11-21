import './App.css';
import Landing from './components/Landing.jsx';
import {Route} from "react-router-dom";
import Nav from './components/Nav.jsx';
import React, { useState, useEffect } from 'react';
import PokeContainer from './components/PokeContainer.jsx';

import axios from "axios";
import Card from './components/Card';

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    (async() => {
      const pokemons = await axios("http://localhost:3001/pokemons");
      setPokemons(pokemons.data);
    })()    
  }, []);


  return (
    <div className="App">
      <Route exact path="/">
        <Landing/>
      </Route>

      <Route path="/pokemons">
        <Nav/>
        
        <PokeContainer class_name="pokeContainer">
          {pokemons.map(p => <Card key={p?.name} name={p?.name} image={p?.sprite} types={p?.types}/>)}
          
        </PokeContainer>
      </Route>
    </div>
  );
}

export default App;
