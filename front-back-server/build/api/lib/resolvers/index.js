"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CustomScalar = _interopRequireDefault(require("./CustomScalar"));

var _device = _interopRequireDefault(require("./device"));

var _messages = _interopRequireDefault(require("./messages"));

var _banners = _interopRequireDefault(require("./banners"));

var _stores = _interopRequireDefault(require("./stores"));

var _graphqlUpload = require("graphql-upload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import GraphQLUpload from 'graphql-upload'
var _default = { ..._device.default.TYPES,
  DateTime: _CustomScalar.default,
  Upload: _graphqlUpload.GraphQLUpload,
  Query: { ..._device.default.QUERIES,
    ..._stores.default.QUERIES,
    ..._banners.default.QUERIES
  },
  Mutation: { ..._device.default.MUTATIONS,
    ..._stores.default.MUTATIONS,
    ..._banners.default.MUTATIONS
  },
  Subscription: { ..._messages.default.SUBSCRIPTIONS,
    ..._stores.default.SUBSCRIPTIONS,
    ..._banners.default.SUBSCRIPTIONS // ...deviceResolver.SUBSCRIPTIONS,

  }
};
exports.default = _default;