"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../../db"));

var _util = require("../../utils/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const conn = (0, _db.default)();
();

var _default = conn.define('bannersmain', {
  BannerId: {
    type: _sequelize.default.INTEGER,
    primaryKey: true,
    autoIncrement: true,

    get(x) {
      return (0, _util.enCode)(this.getDataValue(x));
    }

  },
  path: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  name: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  description: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  BannersState: {
    type: _sequelize.default.SMALLINT(6),
    allowNull: false
  },
  createAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: _sequelize.default.literal('CURRENT_TIMESTAMP')
  },
  updateAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: _sequelize.default.literal('CURRENT_TIMESTAMP')
  }
}, {
  timestamps: false
});

exports.default = _default;