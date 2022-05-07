const Sequelize = require('sequelize')
const { enCode, validationID } = require('../../utils/util')
const connect = require('../../db')
const Users = require('../Users')
const CountriesModel = require('../information/CountriesModel')
const DepartmentsModel = require('../information/DepartmentsModel')
const CitiesModel = require('../information/CitiesModel')
const sequelize = connect()

// sequelize.sync()

const Userprofile = sequelize.define('userprofile', {
  upId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Users,
      key: 'id'
    },
    unique: true,
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('id', validationID(x, false)) }
  },
  upPhone: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  upImage: {
    type: Sequelize.STRING(200),
    allowNull: true
  },
  upDateBir: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  upAddress: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  // Locations
  cId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: CountriesModel,
      key: 'cId'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  dId: {
    type: Sequelize.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: true,
    references: {
      model: DepartmentsModel,
      key: 'dId'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  ctId: {
    type: Sequelize.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: true,
    references: {
      model: CitiesModel,
      key: 'ctId'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  upZipCode: {
    type: Sequelize.STRING(150),
    allowNull: true
  },
  upLatitude: {
    type: Sequelize.STRING(150),
    allowNull: true
  },
  upLongitude: {
    type: Sequelize.STRING(150),
    allowNull: true
  },
  createAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updateAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  timestamps: false
})

module.exports = Userprofile