import Sequelize from 'sequelize'
import connect from '../../db'
import Store from './Store'
import Users from '../Users'
import { enCode } from '../../utils/util'

const conn = connect()

export default conn.define('ratingstartstore', {
  rSId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  id: {
    type: Sequelize.INTEGER,
    onUpdate: null,
    onDelete: null,
    references: {
      model: Users,
      key: 'id'
    },
    get(x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
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
  rScore: {
    type: Sequelize.SMALLINT(6),
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
