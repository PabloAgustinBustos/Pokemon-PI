const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  /* 
    stats[0] -> hp
    stats[1] -> atack
    stats[2] -> defense
    stats[5] -> speed

  */
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    // https://pokeapi.co/api/v2/pokemon/1 . name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // https://pokeapi.co/api/v2/pokemon/1 . stats[0] . stat . name -> name del stat que en este caso es hp
    // https://pokeapi.co/api/v2/pokemon/1 . stats[0] . base_stat -> valor del stat (número)
    hp: {
      type: DataTypes.INTEGER,
    },

    // https://pokeapi.co/api/v2/pokemon/1 . stats[1] . stat . name -> name del stat attack
    // https://pokeapi.co/api/v2/pokemon/1 . stats[1] . base_stat -> valor del stat (número)
    atk: {
      type: DataTypes.INTEGER,
    },

    // https://pokeapi.co/api/v2/pokemon/1 . stats[2] . stat . name -> name del stat defense
    // https://pokeapi.co/api/v2/pokemon/1 . stats[2] . base_stat -> valor del stat (número)
    def: {
      type: DataTypes.INTEGER,
    },

    // https://pokeapi.co/api/v2/pokemon/1 . stats[5] . stat . name -> name del stat speed
    // https://pokeapi.co/api/v2/pokemon/1 . stats[5] . base_stat -> valor del stat (número)
    speed: {
      type: DataTypes.INTEGER,
    },

    // https://pokeapi.co/api/v2/pokemon/1 . height -> altura en numero
    height: {
      type: DataTypes.INTEGER,
    },

    // https://pokeapi.co/api/v2/pokemon/1 . weight -> peso en numero
    weight: {
      type: DataTypes.INTEGER,
    },
  });
};
