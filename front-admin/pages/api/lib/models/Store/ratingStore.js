import Sequelize from 'sequelize'
import connect from '../../db'
import Store from './Store'
import Users from '../Users'
import { enCode } from '../../utils/util'

const conn = connect()
conn.sync()

export default conn.define('ratingstore', {
  rId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  id: {
    type: Sequelize.INTEGER,
    onUpdate: null,
    unique: true,
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
  rAppearance: {
    type: Sequelize.SMALLINT(6),
    allowNull: true
  },
  rTasty: {
    type: Sequelize.SMALLINT(6),
    allowNull: true
  },
  rGoodTemperature: {
    type: Sequelize.SMALLINT(6),
    allowNull: true
  },
  rGoodCondition: {
    type: Sequelize.SMALLINT(6),
    allowNull: true
  },
  rState: {
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
