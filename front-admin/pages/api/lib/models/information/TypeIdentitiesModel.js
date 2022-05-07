const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
const { enCode } = require('../../utils/util')

// 

const TypeIdentitiesModel = sequelize.define('typeidentities', {
  tiId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  tiName: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  tiState: {
    type: Sequelize.SMALLINT,
    allowNull: false,
    defaultValue: 1
  },
  tiDatCre: {
    type: Sequelize.DATE,
    default: Date.now()
  },
  tiDatMod: {
    type: Sequelize.DATE,
    default: Date.now()
  }
}, {
  timestamps: false
})

module.exports = TypeIdentitiesModel