import { INTEGER, STRING, literal } from 'sequelize'
import connect from '../../db'
import Users from '../Users'
import Store from './Store'
const sequelize = connect()
import { enCode } from '../../utils/util'

sequelize.sync()

const ScheduleStore = sequelize.define('storechedules', {
  schId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  id: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Users,
      key: 'id'
    },
    get(x) {return enCode(this.getDataValue(x))}
  },
  idStore: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Store,
      key: 'idStore'
    },
    get(x) {return enCode(this.getDataValue(x))}
  },
  schDay: {
    type: INTEGER,
    allowNull: false
  },
  schHoSta: {
    type: STRING(60),
    allowNull: false
  },
  schHoEnd: {
    type: STRING(60),
    allowNull: false
  },
  schState: {
    type: INTEGER,
    allowNull: false
  },
  createAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP')
  },
  updateAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP')
  }
}, {
  timestamps: false
})

export default ScheduleStore