import { INTEGER, STRING, TEXT, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
import { enCode, validationID } from '../../utils/util'
const sequelize = connect()
import TypePQR from './TypPQR'

// 

const PQR = sequelize.define('PQR', {
  hpqrId: {
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
      model: TypePQR,
      key: 'thpId'
    },
    get (x) { return enCode(this.getDataValue(x)) },
    set (x) { this.setDataValue('thpId', validationID(x)) }
  },
  hpqrQuestion: {
    type: STRING(120),
    allowNull: false
  },

  hpqrAnswer: {
    type: TEXT,
    allowNull: false
  },

  hpqrState: {
    type: SMALLINT,
    allowNull: true,
    defaultValue: 1
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

export default PQR