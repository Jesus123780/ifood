import { INTEGER, STRING, SMALLINT, DATE } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'

// 

const TypeIdentitiesModel = sequelize.define('typeidentities', {
  tiId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  tiName: {
    type: STRING(100),
    allowNull: false
  },
  tiState: {
    type: SMALLINT,
    allowNull: false,
    defaultValue: 1
  },
  tiDatCre: {
    type: DATE,
    default: Date.now()
  },
  tiDatMod: {
    type: DATE,
    default: Date.now()
  }
}, {
  timestamps: false
})

export default TypeIdentitiesModel