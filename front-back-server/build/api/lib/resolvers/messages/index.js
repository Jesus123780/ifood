"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messages = _interopRequireDefault(require("./messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  TYPES: { ..._messages.default.TYPES
  },
  QUERIES: { ..._messages.default.QUERIES
  },
  MUTATIONS: { ..._messages.default.MUTATIONS
  },
  SUBSCRIPTIONS: { ..._messages.default.SUBSCRIPTIONS
  }
};
exports.default = _default;