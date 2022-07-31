import Sequelize from 'sequelize'
import connect from '../../db'
import Store from './Store'
import Users from '../Users'
import { enCode } from '../../utils/util'

const conn = connect()

export default conn.define('walletdebt', {
  debtWalletId: {
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
  UserDebtId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Users,
      key: 'id'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  debtName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ccWalletUser: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phoneWalletUser: {
    type: Sequelize.STRING,
    allowNull: false
  },
  personName: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  gender: {
    type: Sequelize.SMALLINT(6),
    allowNull: true,
    defaultValue: 1
  },
  RefDebtCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  debtAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  debtUuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  debtComments: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  debtState: {
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
