"use strict";

const Sequelize = require('sequelize');

const connect = require('../../db');

const sequelize = connect();

const SizeModel = require('../information/size');

const colorModel = require('../information/color');

const CountriesModel = require('../information/CountriesModel');

const DepartmentsModel = require('../information/DepartmentsModel');

const CitiesModel = require('../information/CitiesModel');

const Feature = require('../feature/feature');

const CategoryProductsModel = require('../Categories/CategoryProducts');

const {
  enCode,
  validationID,
  validations
} = require('../../utils/util');

const Users = require('../Users');

const Store = require('../Store/Store');

sequelize.sync();
const catProducts = sequelize.define('catProducts', {
  carProId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,

    get(x) {
      return enCode(this.getDataValue(x));
    }

  },
  // id store
  idStore: {
    type: Sequelize.INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Store,
      key: 'idStore'
    },

    get(x) {
      return enCode(this.getDataValue(x));
    }

  },
  // User
  id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Users,
      key: 'id'
    },

    get(x) {
      return enCode(this.getDataValue(x));
    }

  },
  idStore: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Store,
      key: 'idStore'
    },

    get(x) {
      return enCode(this.getDataValue(x));
    }

  },
  pName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  ProDescription: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  pState: {
    type: Sequelize.TINYINT,
    allowNull: true
  },
  pDatCre: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true
  },
  pDatMod: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true
  }
}, {
  timestamps: false
});
module.exports = catProducts;