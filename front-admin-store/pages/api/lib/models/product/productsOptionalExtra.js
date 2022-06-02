import { INTEGER, STRING, TINYINT, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'
import Store from '../Store/Store'
import productModelFood from './productFood'

const productsOptionalExtra = sequelize.define('productsoptionalextra', {
  opExPid: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  pId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: productModelFood,
      key: 'pId'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  idStore: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Store,
      key: 'idStore'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  OptionalProName: {
    type: STRING,
    allowNull: false
  },
  code: {
    type: STRING,
    allowNull: false
  },
  numbersOptionalOnly: {
    type: INTEGER(20),
    allowNull: true
  },
  state: {
    type: TINYINT,
    allowNull: false,
    defaultValue: 1
  },
  required: {
    type: TINYINT,
    allowNull: true,
    defaultValue: 0
  },
  pDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  pDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default productsOptionalExtra