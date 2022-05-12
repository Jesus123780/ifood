import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import { enCode } from '../../utils/util'
import connect from '../../db'
const sequelize = connect()

const UsersLevelsModel = sequelize.define('userslevels', {
  ulId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  ulName: {
    type: STRING(100),
    allowNull: false
  },
  ulState: {
    type: SMALLINT,
    allowNull: false
  },
  uldDtCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  ulDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

export default UsersLevelsModel