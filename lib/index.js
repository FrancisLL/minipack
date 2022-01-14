
const Compiler = require('./compiler')

const options = require('../minipack.config.js')

new Compiler(options).run()