const { Router } = require('express');
const axios = require("axios");

const {Pokemon, Type, conn} = require("../db");

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
        sprite: res.sprites.front_default,
        id: res.id,
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
        // si no hay query name, se busca a todos
        if(!name){
            // result = await axios("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40");
            result = await axios("https://pokeapi.co/api/v2/pokemon?offset=0&limit=6");         //primero agarro los datos de la API

            pokemonsAPI = await getPokemons(result.data.results);                               //luego armo el array de pokemons como lo quiero
    
            pokemonDB = await Pokemon.findAll({                                                 //también los busco en la DB
                include: Type,
            });

            myPokemons = pokemonDB.map(p => p.dataValues);                                      //y armo el array de pokemons de DB como yo los quiero

            pokemons = [...pokemonsAPI, ...myPokemons]                                          //los junto

            res.status(200).json(pokemons);
        }else{
            console.log("voy a buscar a " + name)
            pokemonDB = await Pokemon.findOne({   
                where: {
                    name
                }
            });

            if(pokemonDB){
                res.status(200).json(pokemonDB.dataValues);
            }else if(pokemonDB === null){
                result = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
    
                pokemon = await getPokemon(result.data);
    
                res.status(200).json(pokemon);
            }
            res.status(200).json({message: "mandado"})
        }
    }catch(e){
        res.status(404).json(e);
    }
})

router.get("/pokemons/:idPokemon", async(req, res) => {     
    let { idPokemon } = req.params;
    
    let pokemon = {};

    try{
        if(idPokemon.includes("-")){
            pokemon = await Pokemon.findOne({
                where: {
                    id: idPokemon
                },
                
                include: Type,
            });
        
            res.json(pokemon);
        }else{
            const result = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
    
            pokemon = await getPokemon(result.data);
    
            res.json(pokemon);
        }
    }catch(e){
        res.status(404).json({message: "F"});
    }
})

// TODO todo el GET de types
router.get("/types", async(req, res) => {
    

    try {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const data = await response.json();
        
        const types = data.results.map( async (t) => {
            const type = await Type.findOne({ where: { name: t.name } })
            
            if (type === null) {
                await Type.create({
                name: t.name
                });
            }
        });
        
        const aux = await Promise.all(types)
        const typesDb = await Type.findAll();
        res.json(typesDb)
    } catch (error) {
        res.status(404).json(error)
    }

})

router.post("/pokemons", async(req, res) => {
    const {name, hp, atk, def, speed, height, weight, types} = req.body;

    try{
        const newPokemon = await Pokemon.create({name, hp, atk, def, speed, height, weight});
        newPokemon.setType(types)

        res.status(200).json({message: "pokemon creado"})
    }catch(e){
        res.status(404).json({message: "F"})
    }
})


module.exports = router;
