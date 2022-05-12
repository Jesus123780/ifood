import { INTEGER, STRING, literal } from 'sequelize'
import { enCode } from '../../utils/util'
import connect from '../../db'
const sequelize = connect()

const UserMasters = sequelize.define('usermastermodel', {
  IdM: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  umSeCredential: {
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

export default UserMasters