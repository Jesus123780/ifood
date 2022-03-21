"use strict";

const Sequelize = require('sequelize');

const {
  enCode
} = require('../../utils/util');

const connect = require('../../db');

const sequelize = connect();
const UsersLevelsModel = sequelize.define('userslevels', {
  ulId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,

    get(x) {
      return enCode(this.getDataValue(x));
    }

  },
  ulName: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  ulState: {
    type: Sequelize.SMALLINT,
    allowNull: false
  },
  uldDtCre: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  ulDatMod: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
});
module.exports = UsersLevelsModel;