const fs = require("fs-extra");
fs.removeSync(`../build`);
fs.copySync(`./build`, `../build`);
//fs.copySync(`./build/static${APP_NAME}.js`,`../chameleon-backend/www/static/${APP_NAME}.js`);
