"use strict";

const Sequelize = require('sequelize');

const connect = require('../../db');

const CustomersModel = require('../customers/CustomersModel');

const CitiesModel = require('../information/CitiesModel');

const TypeIdentitiesModel = require('../information/TypeIdentitiesModel');

const {
  enCode
} = require('../../utils/util');

const sequelize = connect();
const CostCentersModel = sequelize.define('costcenters', {
  ccId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,

    get(x) {
      return enCode(this.getDataValue(x));
    }

  },
  cId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: CustomersModel,
      key: 'cId'
    },

    get(x) {
      return enCode(this.getDataValue(x));
    }

  },
  tiId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: TypeIdentitiesModel,
      key: 'tiId'
    },

    get(x) {
      return enCode(this.getDataValue(x));
    }

  },
  cityId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: CitiesModel,
      key: 'cId'
    },

    get(x) {
      return enCode(this.getDataValue(x));
    }

  },
  ccName: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  ccNit: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  },
  ccNitDV: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  ccPhone: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  ccContact: {
    type: Sequelize.STRING(50)
  },
  ccConPho: {
    type: Sequelize.STRING(20)
  },
  ccEmail: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  },
  ccNumAdd: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  ccNumStr: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  ccNumHou: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  ccInformation: {
    type: Sequelize.STRING(100)
  },
  ccState: {
    type: Sequelize.SMALLINT,
    allowNull: false
  },
  ccDatCre: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  ccDatMod: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
});
module.exports = CostCentersModel;