const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
const { enCode } = require('../../utils/util')
const Users = require('../Users')
const Store = require('./Store')

sequelize.sync()

const StatusPedidosModel = sequelize.define('statuspedidos', {
  stPId: {
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
  pSState: {
    type: Sequelize.TINYINT,
    defaultValue: 0
  },
  locationUser: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pCodeRef: {
    type: Sequelize.STRING(100),
    unique: true,
    allowNull: false
  },
  change: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  totalProductsPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  payMethodPState: {
    type: Sequelize.TINYINT,
    defaultValue: 1
  },
  pickUp: {
    type: Sequelize.TINYINT,
    defaultValue: 0
  },
  pPDate: {
    type: Sequelize.DATE
  },
  pDatCre: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  pDatMod: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: true
})

module.exports = StatusPedidosModel