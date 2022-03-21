"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  TYPES: { ..._store.default.TYPES
  },
  QUERIES: { ..._store.default.QUERIES
  },
  MUTATIONS: { ..._store.default.MUTATIONS
  }
};
exports.default = _default;