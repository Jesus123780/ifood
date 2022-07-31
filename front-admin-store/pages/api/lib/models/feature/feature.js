import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import { enCode, validationID } from '../../utils/util'
import connect from '../../db'
const sequelize = connect()
import Typefeature from './TypFeature'

// 

const Feature = sequelize.define('feature', {
  fId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
  },
  thpId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Typefeature,
      key: 'thpId'
    },
    get (x) { return enCode(this.getDataValue(x)) },
    set(x) { return this.setDataValue('thpId', validationID(x, false))}
  },
  hpqrQuestion: {
    type: STRING(120),
    allowNull: false
  },
  hpqrState: {
    type: SMALLINT,
    allowNull: false
  },
  hpqrDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },

  hpqrDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default Feature