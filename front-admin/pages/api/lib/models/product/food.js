import { INTEGER, STRING, TEXT, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'
import Users from '../Users'
import Store from '../Store/Store'

sequelize.sync()

const productModel = sequelize.define('productstore', {
  pfId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    // get(x) {return enCode(this.getDataValue(x))},
    // get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    get(x) {return enCode(this.getDataValue(x))}
  },
  // User
  id: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Users,
      key: 'id'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  // id store
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
  pName: {
    type: STRING,
    allowNull: false
  },
  ProPrice: {
    type: INTEGER,
    allowNull: true
  },
  ProDescuento: {
    type: INTEGER,
    allowNull: true
  },
  ProDescription: {
    type: TEXT,
    allowNull: true
  },
  pState: {
    type: INTEGER(4),
    allowNull: false,
    defaultValue: 1
  },
  sTateLogistic: {
    type: INTEGER(4),
    allowNull: false,
    defaultValue: 1

  },
  // Numero de estrellas
  ProStar: {
    type: INTEGER,
    allowNull: true
  },
  ProImage: {
    type: TEXT,
    allowNull: true
  },
  // ---------------------
  // Alto
  ProHeight: {
    type: STRING,
    defaultValue: 1
  },
  // Peso
  ProWeight: {
    type: STRING,
    defaultValue: 1
  },
  // -----------------------------Listo-----------------------------
  // Destacado
  ProOutstanding: {
    type: SMALLINT            
  },
  // Entrega
  ProDelivery: {
    type: SMALLINT,
    defaultValue: false

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

export default productModel