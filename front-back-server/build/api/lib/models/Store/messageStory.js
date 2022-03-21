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

var _StoryModel = _interopRequireDefault(require("./StoryModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const conn = (0, _db.default)();
conn.sync();

var _default = conn.define('storycomment', {
  cStoId: {
    type: _sequelize.default.INTEGER,
    primaryKey: true,
    autoIncrement: true,

    get(x) {
      return (0, _util.enCode)(this.getDataValue(x));
    }

  },
  stoId: {
    type: _sequelize.default.INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: _StoryModel.default,
      key: 'stoId'
    },

    get(x) {
      return (0, _util.enCode)(this.getDataValue(x));
    }

  },
  from: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  username: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  comments: {
    type: _sequelize.default.TEXT,
    allowNull: false
  },
  messageState: {
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