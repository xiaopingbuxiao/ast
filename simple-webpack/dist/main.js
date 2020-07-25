(function(modules){
      function require(filename){
        var fn = modules[filename]
        var module = {export:{}};
        fn(require,module,module.export)
        return module.export
      }
      require('/Users/pingxiaopingbuxiao/Desktop/ast/simple-webpack/src/index.js')
    })({'/Users/pingxiaopingbuxiao/Desktop/ast/simple-webpack/src/index.js':function(require,module,exports){"use strict";

var _hello = require("./hello.js");

document.write((0, _hello.hello)() + ' webpack');},'./hello.js':function(require,module,exports){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hello = hello;

function hello() {
  return 'hello';
}},});