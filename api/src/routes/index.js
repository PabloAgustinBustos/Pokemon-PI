const { Router } = require('express');
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
    res.json({message: "good"})
})

async function getPokemon(pokemonDB){
    return{
        name: pokemonDB.name,
        hp: pokemonDB.stats[0].base_stat,
        atk: pokemonDB.stats[1].base_stat,
        def: pokemonDB.stats[2].base_stat,
        speed: pokemonDB.stats[5].base_stat,
        height: pokemonDB.height,
        weight: pokemonDB.weight
    }
}

async function getPokemons(pokemonsDB){
    const pokemons = [];

    for(const pokemon of pokemonsDB){
        const info = await axios(pokemon.url);

        const obj = await getPokemon(info.data);
        
        pokemons.push(obj);

        console.log(pokemons.length)
    }

    return pokemons;
}

router.get("/pokemons", async(req, res) => {  
    let {name} = req.query;

    let result = {};
    let pokemons = {}
    let pokemon = {};

    try{
        if(!name){
            // result = await axios("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1200");
            result = await axios("https://pokeapi.co/api/v2/pokemon?offset=0&limit=15");
    
            pokemons = await getPokemons(result.data.results);
    
            res.status(200).json(pokemons);
        }else{
            result = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);

            pokemon = await getPokemon(result.data);

            console.log(pokemon)

            res.status(200).json(pokemon);
        }
    }catch(e){
        res.status(404).json(pokemon)
    }
})

router.get("/pokemons/:idPokemon", async(req, res) => {     
    try{
        let { idPokemon } = req.params;

        const result = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);

        const pokemon = await getPokemon(result.data);

        console.log(pokemon)

        res.status(200).json(pokemon);
    }catch(e){
        res.status(404).json({message: "F"});
    }
})


module.exports = router;
