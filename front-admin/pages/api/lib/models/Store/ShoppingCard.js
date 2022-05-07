const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
const { enCode } = require('../../utils/util')
const productModelFood = require('../product/productFood')
const Users = require('../Users')
const SubProducts = require('./shoppingCardSubProduct')
const Store = require('./Store')

const ShoppingCard = sequelize.define('shoppingcards', {
  ShoppingCard: {
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
  pId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: productModelFood,
      key: 'pId'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  // id store
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
  ShoppingCardRefCode: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  discountCardProduct: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  comments: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  cantProducts: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  cState: {
    type: Sequelize.SMALLINT,
    defaultValue: 1
  },
  cDatCre: {
    type: Sequelize.DATE,
    default: Date.now()
  },
  cDatMod: {
    type: Sequelize.DATE,
    default: Date.now()
  }
}, {
  timestamps: false
})

module.exports = ShoppingCard
