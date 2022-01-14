
      (function(modules){
        function require(fileName) {
          const fn = modules[fileName]

          const module = { exports : {} };

          fn(require, module, module.exports);

          return module.exports
        }

        require('/Applications/work/z-personal/00-github/minipack/src/index.js')
      })({'/Applications/work/z-personal/00-github/minipack/src/index.js': function (require, module, exports) {"use strict";

var _config = require("./config.js");

var _greeting = require("./greeting.js");

var log = (0, _greeting.greeting)("minipack " + _config.NAME);
document.write(log);},'./config.js': function (require, module, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NAME = exports.NAME = 'heavy rain';},'./greeting.js': function (require, module, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;

var _config = require("./config.js");

function greeting(name) {
  var str = "your " + _config.NAME + " name: " + name;
  console.log(str);
  return str;
}},})
    