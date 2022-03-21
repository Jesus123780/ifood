"use strict";

const Sequelize = require('sequelize');

const connect = require('../../db');

const sequelize = connect();

const {
  enCode,
  validationID
} = require('../../utils/util');

const RolesModel = sequelize.define('roles', {
  rId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,

    get(x) {
      return enCode(this.getDataValue(x));
    }

  },
  rName: {
    type: Sequelize.STRING(120),
    allowNull: false
  },
  rState: {
    type: Sequelize.SMALLINT,
    allowNull: false
  },
  rDatCre: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  rDatMod: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
});
module.exports = RolesModel;