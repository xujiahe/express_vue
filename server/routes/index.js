'use strict';
const fs = require('fs');
const path = require('path')

const modulePath = path.join(__dirname, '/modules')

/**
 * 自动化读取所有路由
 * @param {} app 
 */
const routes = (app) => {
  const files = fs.readdirSync(modulePath);
  files.forEach(file => {
    const name = file.slice(0, -3)
    const module = require(`${modulePath}/${name}`);
    app.use(`/api/${name}`, module.default);
  })
}
export default routes