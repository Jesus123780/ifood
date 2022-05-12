import { INTEGER, TINYINT, STRING, DATE, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'
import Users from '../Users'
import ShoppingCard from './ShoppingCard'
import Store from './Store'



const pedidosModel = sequelize.define('storepedidos', {
  pdpId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
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
  ShoppingCard: {
    type: INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: ShoppingCard,
      key: 'ShoppingCard'
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
  ppState: {
    type: TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  pCodeRef: {
    type: STRING(15),
    allowNull: false
  },
  pPDate: {
    type: DATE
    // defaultValue: Date.now()
  },
  pPStateP: {
    type: TINYINT,
    defaultValue: 0
  },
  payMethodPState: {
    type: TINYINT,
    defaultValue: 0
  },
  pPRecoger: {
    type: TINYINT,
    defaultValue: 0
  },
  unidProducts: {
    type: INTEGER,
    allowNull: true
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
  timestamps: true
})

export default pedidosModel