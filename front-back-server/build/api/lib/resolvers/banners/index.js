"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bannerMain = _interopRequireDefault(require("./bannerMain"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  TYPES: { ..._bannerMain.default.TYPES
  },
  QUERIES: { ..._bannerMain.default.QUERIES
  },
  MUTATIONS: { ..._bannerMain.default.MUTATIONS
  }
};
exports.default = _default;