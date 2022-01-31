(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id];

    const module = { exports: {} };

    // 由于我们fn内部的require都是传入的路径 所以我们需要写一个改写require方法
    function innerRequire(path) {
      return require(mapping[path]);
    }
    fn(innerRequire, module, module.exports);

    return module.exports;
  }
  require(0);
})({
  0: [
    function (require, module, exports) {
      "use strict";

      var _a = _interopRequireDefault(require("./js/a.js"));

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      console.log(_a["default"]);
    },
    { "./js/a.js": 1 },
  ],

  1: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports["default"] = void 0;

      var _b = _interopRequireDefault(require("./b.js"));

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      (0, _b["default"])();
      var _default = 1000;
      exports["default"] = _default;
    },
    { "./b.js": 2 },
  ],

  2: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports["default"] = b;

      function b() {
        console.log("b");
      }
    },
    {},
  ],
});
