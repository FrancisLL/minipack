const  { getAST } = require('./parser')

const path = require('path')

console.log(getAST(path.join(__dirname, '../src/index.js')))