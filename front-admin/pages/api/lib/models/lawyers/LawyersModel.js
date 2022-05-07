const Sequelize = require('sequelize')
const { enCode, validationID } = require('../../utils/util')
const connect = require('../../db')
const sequelize = connect()
const ThirdPartiesModel = require('../thirdParties/ThirdPartiesModel')

// 

const LawyersModel = sequelize.define('lawyers', {
  lId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  tpId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: ThirdPartiesModel,
      key: 'tpId'
    },
    unique: true,
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('tpId', validationID(x, false))}
  },
  lCollectionEntity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lFee: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lState: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  lDatCre: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  lDatMod: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

module.exports = LawyersModel