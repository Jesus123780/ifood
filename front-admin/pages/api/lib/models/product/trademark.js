import { INTEGER, STRING, DATE } from 'sequelize'
import { enCode } from '../../utils/util'
import connect from '../../db'
const sequelize = connect()

// 

const trademarkModel = sequelize.define('trademark', {
  tId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
  },
  Name: {
    type: STRING(255),
    allowNull: false
  },
  Icon: {
    type: INTEGER,
    allowNull: false
  },
  DatCre: {
    type: DATE,
    default: Date.now()
  },
  DatMod: {
    type: DATE,
    allowNull: true
  }
}, {
  timestamps: false
})

export default trademarkModel