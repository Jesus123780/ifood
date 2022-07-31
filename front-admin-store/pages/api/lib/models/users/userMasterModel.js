import { INTEGER, STRING, literal } from 'sequelize'
import connect from '../../db'
import { enCode } from '../../utils/util'
const sequelize = connect()

const UserMastersModel = sequelize.define('usermasters', {
  umId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  umIdAWS: {
    type: STRING(200),
    allowNull: false,
    unique: true
  },
  umDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  umDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default UserMastersModel