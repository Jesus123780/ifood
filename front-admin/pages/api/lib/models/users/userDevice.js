import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
import { enCode } from '../../utils/util'
import Users from '../Users'
const sequelize = connect()

sequelize.sync()

const UserDeviceModel = sequelize.define('userdevice', {
  dId: {
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
  deviceId: {
    type: STRING(200),
    allowNull: false,
    unique: true
  },
  deviceName: {
    type: STRING(100),
    allowNull: false
  },
  type: {
    type: STRING(100),
    allowNull: true
  },
  short_name: {
    type: STRING(100),
    allowNull: true
  },
  locationFormat: {
    type: STRING(100),
    allowNull: true
  },
  platform: {
    type: STRING(100),
    allowNull: true
  },
  version: {
    type: STRING(100),
    allowNull: true
  },
  family: {
    type: STRING(100),
    allowNull: true
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

export default UserDeviceModel