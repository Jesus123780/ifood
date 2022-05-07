const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
const ModulesModel = require('./ModulesModel')
const UsersModel = require('../users/UsersModel')
const { enCode, validationID } = require('../../utils/util')
/**
 * @deprecated
 */
const UserModulesModel = sequelize.define('usermodules', {
  umdId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  mId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: ModulesModel,
      key: 'mId'
    },
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('mId', validationID(x, false))}
  },
  umId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: UsersModel,
      key: 'umId'
    },
    get(x) {return enCode(this.getDataValue(x))}
  },
  umdState: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  umdPriority: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  umdDatCre: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  umdDatMod: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

module.exports = UserModulesModel