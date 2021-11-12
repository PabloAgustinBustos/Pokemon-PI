const { Router } = require('express');
const axios = require("axios");

const {Pokemon, conn} = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
    res.json({message: "good"})
})

async function getPokemon(res){
    return{
        name: res.name,
        hp: res.stats[0].base_stat,
        atk: res.stats[1].base_stat,
        def: res.stats[2].base_stat,
        speed: res.stats[5].base_stat,
        height: res.height,
        weight: res.weight
    }
}

async function getPokemons(res){
    const pokemons = [];

    for(const pokemon of res){
        const info = await axios(pokemon.url);

        const obj = await getPokemon(info.data);
        
        pokemons.push(obj);

        console.log(pokemons.length)
    }

    return pokemons;
}

router.get("/pokemons", async(req, res) => {  
    let {name} = req.query;

    let result = [];
    let pokemons = [];
    let pokemonDB = [];
    let myPokemons = [];
    let pokemon = {};

    try{
        if(!name){
            // result = await axios("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1200");
            result = await axios("https://pokeapi.co/api/v2/pokemon?offset=0&limit=6");

            pokemonsAPI = await getPokemons(result.data.results);
    
            pokemonDB = await Pokemon.findAll({
                attributes: {
                    exclude: ['ID']
                }
            });

            myPokemons = pokemonDB.map(p => p.dataValues);

            pokemons = [...pokemonsAPI, ...myPokemons]

            res.status(200).json(pokemons);
        }else{
            try{
                result = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
    
                console.log("tengo " + result);
    
                pokemon = await getPokemon(result.data);
    
                res.status(200).json(pokemon);
            }catch(e){
                pokemonDB = await Pokemon.findOne({
                    attributes: {
                        exclude: ['ID']
                    },
                    
                    where: {
                        name
                    }
                });

                console.log(pokemonDB)

                res.status(200).json(pokemonDB.dataValues);
            }
        }
    }catch(e){
        res.status(404).json(e);
    }
})

router.get("/pokemons/:idPokemon", async(req, res) => {     
    let { idPokemon } = req.params;
    
    let pokemon = {};

    try{
        pokemon = await Pokemon.findOne({
            attributes: {
                exclude: ['ID']
            },
            
            where: {
                ID: idPokemon
            }
        });
        
        res.status(200).json(pokemon);
    }catch(e){
        try{
            const result = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
    
            pokemon = await getPokemon(result.data);
    
            console.log("tengo: ", pokemon);
    
            res.status(200).json(pokemon);
        }catch(e){
            res.status(404).json({message: "F"});
        }
        
    }
})

// TODO todo el GET de types
router.get("/types", async(req, res) => {

})

router.post("/pokemons", async(req, res) => {
    try{
        const newPokemon = await Pokemon.create(req.body);

        res.status(200).json(newPokemon)
    }catch(e){
        res.status(404).json({message: "F"})
    }
})


module.exports = router;
