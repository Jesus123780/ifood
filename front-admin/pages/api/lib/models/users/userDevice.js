/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const Sequelize = require('sequelize')
const connect = require('../../db')
const { enCode } = require('../../utils/util')
const Users = require('../Users')
const sequelize = connect()

sequelize.sync()

const UserDeviceModel = sequelize.define('userdevice', {
  dId: {
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
  deviceId: {
    type: Sequelize.STRING(200),
    allowNull: false,
    unique: true
  },
  deviceName: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  type: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  short_name: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  locationFormat: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  platform: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  version: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  family: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  dState: {
    type: Sequelize.SMALLINT,
    allowNull: false
  },
  DatCre: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  DatMod: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = UserDeviceModel