import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'
import CountriesModel from './CountriesModel'

const DepartmentsModel = sequelize.define('departments', {
  dId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  cId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: CountriesModel,
      key: 'cId'
    },
    get(x) {return enCode(this.getDataValue(x))}
  },
  dName: {
    type: STRING(100),
    allowNull: false
  },
  dState: {
    type: SMALLINT,
    allowNull: false
  },
  dDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  dDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default DepartmentsModel