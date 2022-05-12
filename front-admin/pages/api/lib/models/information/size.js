import { INTEGER, STRING, SMALLINT, DATE } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'

// 

const SizeModel = sequelize.define('sizes', {
  sizeId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  sizeName: {
    type: STRING(100),
    allowNull: false
  },
  sizeState: {
    type: SMALLINT,
    defaultValue: 1,
    allowNull: true
  },
  DatCre: {
    type: DATE,
    default: Date.now()
  },
  DatMod: {
    type: DATE,
    default: Date.now()
  }
}, {
  timestamps: false
})

export default SizeModel