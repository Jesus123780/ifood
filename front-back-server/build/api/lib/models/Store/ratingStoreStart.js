"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../../db"));

var _Store = _interopRequireDefault(require("./Store"));

var _Users = _interopRequireDefault(require("../Users"));

var _util = require("../../utils/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const conn = (0, _db.default)();
();

var _default = conn.define('ratingstartstore', {
  rSId: {
    type: _sequelize.default.INTEGER,
    primaryKey: true,
    autoIncrement: true,

    get(x) {
      return (0, _util.enCode)(this.getDataValue(x));
    }

  },
  id: {
    type: _sequelize.default.INTEGER,
    onUpdate: null,
    onDelete: null,
    references: {
      model: _Users.default,
      key: 'id'
    },

    get(x) {
      return this.getDataValue(x) ? (0, _util.enCode)(this.getDataValue(x)) : null;
    }

  },
  idStore: {
    type: _sequelize.default.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: _Store.default,
      key: 'idStore'
    },

    get(x) {
      return (0, _util.enCode)(this.getDataValue(x));
    }

  },
  rScore: {
    type: _sequelize.default.SMALLINT(6),
    allowNull: true
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