/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
const { enCode, validationID } = require('../../utils/util')
const UsersModel = require('../users/UsersModel')

// 

const userSessionsModel = sequelize.define('usersessions', {
  usId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  uId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: UsersModel,
      key: 'uId'
    },
    unique: true,
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('uId', validationID(x, false)) }
  },
  usToken: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  usSessionID: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  usDevice: {
    type: Sequelize.STRING(255)
  },
  usIP: {
    type: Sequelize.STRING(255)
  },
  usState: {
    type: Sequelize.INTEGER,
    allowNull: false
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

})

module.exports = userSessionsModel