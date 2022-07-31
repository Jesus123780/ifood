"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../../db"));

var _Store = _interopRequireDefault(require("./Store"));

var _util = require("../../utils/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const conn = (0, _db.default)();
();

var _default = conn.define('bannerstore', {
  bnId: {
    type: _sequelize.default.INTEGER,
    primaryKey: true,
    autoIncrement: true,

    get(x) {
      return (0, _util.enCode)(this.getDataValue(x));
    }

  },
  idStore: {
    type: _sequelize.default.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    unique: true,
    references: {
      model: _Store.default,
      key: 'idStore'
    },

    get(x) {
      return (0, _util.enCode)(this.getDataValue(x));
    }

  },
  bnState: {
    type: _sequelize.default.SMALLINT(6),
    allowNull: false,
    defaultValue: 1
  },
  bnImage: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  bnImageFileName: {
    type: _sequelize.default.STRING,
    allowNull: true
  },
  path: {
    type: _sequelize.default.STRING,
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