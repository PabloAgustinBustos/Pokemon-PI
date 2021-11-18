//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Type } = require('./src/db.js');
const axios = require("axios");


// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(3001, async() => {

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

    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
