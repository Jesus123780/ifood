const Sequelize = require('sequelize')
const connect = require('../../db')
const { enCode } = require('../../utils/util')
const CitiesModel = require('../information/CitiesModel')
const TypeIdentitiesModel = require('../information/TypeIdentitiesModel')
const sequelize = connect()

const CustomersModel = sequelize.define('customers', {
  cId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
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
    get(x) {return enCode(this.getDataValue(x))}
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
    get(x) {return enCode(this.getDataValue(x))}
  },
  cName: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  cNit: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  },
  cNitDV: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  cPhone: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  cEmail: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  },
  cNumAdd: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  cNumStr: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  cNumHou: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  cInformation: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  cCharge: {
    type: Sequelize.STRING(50)
  },
  cState: {
    type: Sequelize.SMALLINT,
    allowNull: false
  },
  cDatCre: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  cDatMod: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

module.exports = CustomersModel