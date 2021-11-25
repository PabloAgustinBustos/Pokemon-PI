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

function getPokemon(res){
    const {types} = res;

    const newTypes = types.map(t => {
        return {
            id: t.slot,
            name: t.type.name
        }
    })

    return{
        sprite: res.sprites.front_default,
        id: res.id,
        name: res.name,
        hp: res.stats[0].base_stat,
        atk: res.stats[1].base_stat,
        def: res.stats[2].base_stat,
        speed: res.stats[5].base_stat,
        height: res.height,
        weight: res.weight,
        types: newTypes
    }
}

async function getPokemons(res){
    const pokemons = [];

    for(const pokemon of res){
        const info = await axios(pokemon.url);

        const obj = await getPokemon(info.data);
        
        pokemons.push(obj);
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

    let pag1;
    let pag2;

    try{
        if(!name){     
            result = await axios("https://pokeapi.co/api/v2/pokemon");         
            pag1 = [...result.data.results];

            result = await axios(result.data.next);
            pag2 = [...result.data.results];

            result = [...pag1, ...pag2]

            pokemonsAPI = await getPokemons(result);                               
    
            pokemonDB = await Pokemon.findAll({                                                 
                include: {
                    model: Type,
                    attributes: ["id", "name"],

                    through:{
                        attributes: []
                    }
                },
            });

            myPokemons = pokemonDB.map(p => p.dataValues);                                    

            pokemons = [...pokemonsAPI, ...myPokemons]                                         

            res.json(pokemons);
        }else{
            pokemonDB = await Pokemon.findOne({   
                where: {
                    name
                },

                include: {
                    model: Type,
                    attributes: ["id", "name"],

                    through:{
                        attributes: []
                    }
                },
            });

            if(pokemonDB){
                res.json(pokemonDB.dataValues);
            }else{
                result = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);

                pokemon = getPokemon(result.data);
    
                res.json(pokemon);
            }
        }
    }catch(e){
        res.status(404).json({error: "no existe ese pokemon"});
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
                
                include: {
                    model: Type,
                    attributes: ["id", "name"],

                    through:{
                        attributes: []
                    }
                },
            });
        
            res.json(pokemon);
        }else{
            const result = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
    
            pokemon = getPokemon(result.data);
    
            res.json(pokemon);
        }
    }catch(e){
        res.status(404).json({message: "F"});
    }
})

router.get("/types", async(req, res) => {
    try {
        const result = await axios('https://pokeapi.co/api/v2/type');
        const types = result.data.results

        for(let type of types){
            let {name} = type;

            const typeBD = await Type.findOne({
                where: {
                    name
                }
            })

            if(!typeBD){
                await Type.create({name})
            }
        }

        res.json(types);
    } catch (error) {
        res.status(404).json(error)
    }

})

router.post("/pokemons", async(req, res) => {
    const {name, hp, atk, def, speed, height, weight, types} = req.body;
    
    try{
        const newPokemon = await Pokemon.create({name, hp, atk, def, speed, height, weight});

        await newPokemon.setTypes(types);


        return res.json({message: "pokemon creado con exito"})
    }catch(e){
        return res.status(404).json({message: "F"})
    }
})


module.exports = router;
