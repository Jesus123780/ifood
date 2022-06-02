import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'

const RolesModel = sequelize.define('roles', {
  rId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  rName: {
    type: STRING(120),
    allowNull: false
  },
  rState: {
    type: SMALLINT,
    allowNull: false
  },
  rDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  rDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

export default RolesModel