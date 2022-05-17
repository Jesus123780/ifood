import { INTEGER, UUID, UUIDV4, STRING, SMALLINT, DATE } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'
import productModelFood from '../product/productFood'
import Users from '../Users'
import Store from './Store'

const ShoppingCard = sequelize.define('shoppingcards', {
  ShoppingCard: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  id: {
    type: INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Users,
      key: 'id'
    },
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
  ShoppingCardRefCode: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false
  },
  discountCardProduct: {
    type: STRING(100),
    allowNull: true
  },
  comments: {
    type: STRING(100),
    allowNull: true
  },
  cantProducts: {
    type: INTEGER,
    allowNull: true
  },
  cState: {
    type: SMALLINT,
    defaultValue: 1
  },
  cDatCre: {
    type: DATE,
    default: Date.now()
  },
  cDatMod: {
    type: DATE,
    default: Date.now()
  }
}, {
  timestamps: false
})

export default ShoppingCard
