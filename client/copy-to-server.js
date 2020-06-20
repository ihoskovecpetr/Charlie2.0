const APP_NAME = require("./package.json").name;

const fs = require("fs-extra");
fs.copySync(`./build`, `../build`);
//fs.copySync(`./build/static${APP_NAME}.js`,`../chameleon-backend/www/static/${APP_NAME}.js`);
