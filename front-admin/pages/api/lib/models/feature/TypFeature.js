import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import { enCode } from '../../utils/util'
import connect from '../../db'
const sequelize = connect()

// 

const Typefeature = sequelize.define('typefeature', {
  thpId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
  },
  thpName: {
    type: STRING(100),
    allowNull: false
  },
  thpIcon: {
    type: SMALLINT,
    allowNull: true,
    defaultValue: 1
  },
  thpState: {
    type: SMALLINT,
    allowNull: true,
    defaultValue: 1
  },
  thpDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  thpDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default Typefeature