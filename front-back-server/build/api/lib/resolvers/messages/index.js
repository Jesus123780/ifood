"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messages = _interopRequireDefault(require("./messages"));

var _messages_store_client = _interopRequireDefault(require("./messages_store_client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
var _default = {
  TYPES: { ..._messages.default.TYPES,
    ..._messages_store_client.default.TYPES
  },
  QUERIES: { ..._messages.default.QUERIES,
    ..._messages_store_client.default.QUERIES
  },
  MUTATIONS: { ..._messages.default.MUTATIONS,
    ..._messages_store_client.default.MUTATIONS
  },
  SUBSCRIPTIONS: { ..._messages.default.SUBSCRIPTIONS,
    ..._messages_store_client.default.SUBSCRIPTIONS
  }
};
exports.default = _default;