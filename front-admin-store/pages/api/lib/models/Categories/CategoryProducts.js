import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import { enCode } from '../../utils/util'
import connect from '../../db'
const sequelize = connect()

// 

const CategoryProductsModel = sequelize.define('categorieproduct', {
  caId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  cpName: {
    type: STRING(200),
    allowNull: false
  },
  cpImage: {
    type: STRING,
    trim: true,
    allowNull: true
  },
  cpState: {
    type: SMALLINT,
    allowNull: false
  },
  DatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  DatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default CategoryProductsModel