const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
const SizeModel = require('../information/size')
const colorModel = require('../information/color')
const CountriesModel = require('../information/CountriesModel')
const DepartmentsModel = require('../information/DepartmentsModel')
const CitiesModel = require('../information/CitiesModel')
const Feature = require('../feature/feature')
const CategoryProductsModel = require('../Categories/CategoryProducts')
const { enCode, validationID, validations } = require('../../utils/util')
const Users = require('../Users')
const Store = require('../Store/Store')

sequelize.sync()

const Contract = sequelize.define('contract', {
  ctrId: {
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
    get(x) { return enCode(this.getDataValue(x)) }
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
    get(x) { return enCode(this.getDataValue(x)) }
  },
  ctCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  catDescription: {
    type: Sequelize.STRING,
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

module.exports = Contract