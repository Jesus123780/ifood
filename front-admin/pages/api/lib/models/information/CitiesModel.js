import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'
import DepartmentsModel from './DepartmentsModel'

// 

const CitiesModel = sequelize.define('cities', {
  ctId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  dId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: DepartmentsModel,
      key: 'dId'
    },
    get(x) {return enCode(this.getDataValue(x))}
  },
  cName: {
    type: STRING(100),
    allowNull: false
  },
  cState: {
    type: SMALLINT,
    allowNull: false
  },
  cDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  cDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default CitiesModel