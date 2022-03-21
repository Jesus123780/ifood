"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _device = _interopRequireDefault(require("./device"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  TYPES: { ..._device.default.TYPES
  },
  QUERIES: { ..._device.default.QUERIES
  },
  MUTATIONS: { ..._device.default.MUTATIONS
  },
  SUBSCRIPTIONS: { ..._device.default.SUBSCRIPTIONS
  }
};
exports.default = _default;