import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
import { enCode } from '../../utils/util'
import Store from '../Store/Store'
import Users from '../Users'
const sequelize = connect()


const dynamicPassword = sequelize.define('dynamicpassword', {
  dPassId: {
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
    get(x) { return enCode(this.getDataValue(x)) }
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
    get(x) { return enCode(this.getDataValue(x)) }
  },
  deviceId: {
    type: STRING(200),
    allowNull: false,
    unique: true
  },
  keyPassDynamic: {
    type: INTEGER(4),
    allowNull: false,
    unique: false
  },
  deviceName: {
    type: STRING(100),
    allowNull: false
  },
  dState: {
    type: SMALLINT,
    allowNull: false
  },
  DatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  DatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default dynamicPassword