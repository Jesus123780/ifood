import Sequelize from 'sequelize'
import connect from '../../db'
import Store from './Store'
import Users from '../Users'
import { enCode } from '../../utils/util'

const conn = connect()
conn.sync()

export default conn.define('clients', {
  cliId: {
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
  idUser: {
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
  clState: {
    type: Sequelize.SMALLINT(6),
    allowNull: true,
    defaultValue: 1
  },
  gender: {
    type: Sequelize.SMALLINT(2),
    allowNull: true,
    defaultValue: 1
  },
  ClientAddress: {
    type: Sequelize.SMALLINT(100)
  },
  clientNumber: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  clientName: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  clientLastName: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  ccClient: {
    type: Sequelize.STRING(100),
    unique: true,
    allowNull: true
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
