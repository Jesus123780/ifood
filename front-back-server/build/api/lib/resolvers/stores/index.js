"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("./store"));

var _products = _interopRequireDefault(require("./products"));

var _orders = _interopRequireDefault(require("./orders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
var _default = {
  TYPES: { ..._store.default.TYPES,
    ..._orders.default.TYPES,
    ..._products.default.TYPES
  },
  QUERIES: { ..._store.default.QUERIES,
    ..._products.default.QUERIES,
    ..._orders.default.QUERIES
  },
  MUTATIONS: { ..._store.default.MUTATIONS,
    ..._orders.default.MUTATIONS,
    ..._products.default.MUTATIONS
  },
  SUBSCRIPTIONS: { ..._orders.default.SUBSCRIPTIONS
  }
};
exports.default = _default;