import Sequelize from 'sequelize'
import connect from '../../db'
import Store from './Store'
import Users from '../Users'
import { enCode } from '../../utils/util'
import productModelFood from '../product/productFood'

const conn = connect()

export default conn.define('walletdebtproducts', {
  debtWalletProductId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  UserDebtId: {
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
  RefDebtCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  debtAmountProduct: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  debtComments: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  debtProductState: {
    type: Sequelize.SMALLINT(6),
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
}, {
  timestamps: false
})
