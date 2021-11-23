import './App.css';
import Landing from './components/Landing.jsx';
import {Route} from "react-router-dom";
import Nav from './components/Nav.jsx';
import React, { useState, useEffect } from 'react';
import PokeContainer from './components/PokeContainer.jsx';

// import axios from "axios";
import Card from './components/Card';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import {getPokemons} from "./store/actions";

function App() {
  // const [pokemons, setPokemons] = useState([]);
  const [pokemonFragment, setPokemonFragment] = useState([]);
  const [pag, setPag] = useState(1);
  const pokemons = useSelector(state => state.pokemons);
  const dispatch = useDispatch();

    // acá se debe hacer la petición al servidor
  useEffect(() => {
    dispatch(getPokemons())
  }, []);

  useEffect(() => {
    console.log("sea ctualizó la DB")
    setPokemonFragment(pokemons.slice(
      (pag - 1) * 12,
      pag * 12
    ))
  }, [pokemons, pag]);

  return (
    <div className="App">
      <Route exact path="/">
        <Landing/>
      </Route>

      <Route path="/pokemons">
        <Nav/>
      
        <PokeContainer class_name="pokeContainer">
          {pokemonFragment.length > 0 ? pokemonFragment?.map(p => <Card key={p?.name} name={p?.name} image={p?.sprite} types={p?.types}/>) : <Loading/>}
          
        </PokeContainer>
        
        <Pagination pag={pag} total={Math.ceil(pokemons.length/12)} onChange={(newPage) => setPag(newPage)}/>
        {/* <Pagination/> */}
      </Route>

    </div>
  );
}

export default App;
