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
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
// require("dotenv").config();

// Syncing all the models at once.

const PORT = process.env.PORT ? process.env.PORT : 3001;
conn.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`TODO OK !! ESCUCHANDO!! puerto ${PORT}`);
  });
});
// conn.sync({ force: true }).then(() => {
//   server.listen(3001, () => {
//     console.log("%s TODO OK !! ESCUCHANDO!!");
//     // eslint-disable-line no-console
//   });
// });
