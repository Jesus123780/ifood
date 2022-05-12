import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
import { enCode, validationID } from '../../utils/util'
import productModel from '../product/product'
const sequelize = connect()

const AreasModel = sequelize.define('areas', {
  aId: {
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
      model: productModel,
      key: 'pId'
    },
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('pId', validationID(x, false)) }
  },
  aName: {
    type: STRING(120),
    allowNull: false
  },
  aState: {
    type: SMALLINT,
    allowNull: false
  },
  aDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  aDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

export default AreasModel