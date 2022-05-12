"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bannerMain = _interopRequireDefault(require("./bannerMain"));

var _bannerStoreProfile = _interopRequireDefault(require("./bannerStoreProfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
var _default = {
  TYPES: { ..._bannerMain.default.TYPES,
    ..._bannerStoreProfile.default.TYPES
  },
  QUERIES: { ..._bannerMain.default.QUERIES,
    ..._bannerStoreProfile.default.QUERIES
  },
  MUTATIONS: { ..._bannerMain.default.MUTATIONS,
    ..._bannerStoreProfile.default.MUTATIONS
  }
};
exports.default = _default;