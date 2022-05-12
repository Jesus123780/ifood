import { INTEGER, TINYINT, STRING, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'
import Store from '../Store/Store'
import productModelFood from './productFood'

sequelize.sync()

const ExtraProductModel = sequelize.define('extrasproducts', {
  exPid: {
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
  exState: {
    type: TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  extraName: {
    type: STRING,
    allowNull: false
  },
  extraPrice: {
    type: INTEGER,
    allowNull: true
  },
  // state
  state: {
    type: TINYINT,
    allowNull: false,
    defaultValue: 1
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

export default ExtraProductModel