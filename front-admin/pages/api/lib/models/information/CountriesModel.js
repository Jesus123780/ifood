import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'

const CountriesModel = sequelize.define('countries', {
  cId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  cName: {
    type: STRING(100),
    allowNull: false
  },
  cCalCod: {
    type: STRING(10),
    allowNull: false
  },
  cState: {
    type: SMALLINT,
    allowNull: true,
    defaultValue: 1
  },
  cDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: true
  },
  cDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: true
  }
}, {
  timestamps: false
})

export default CountriesModel