import { INTEGER, STRING, literal, ENUM } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'
import Users from '../Users'
import Store from '../Store/Store'
sequelize.sync()

const PaymentCard = sequelize.define('paymentcard', {
  paymentCardId: {
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
  typeCardName: {
    type: ENUM,
    values: ['BANCOLOMBIA', 'BANCO_DE_BOGOTA', 'NEQUI'],
    allowNull: false
  },
  CVV: {
    type: INTEGER,
    allowNull: true
  },
  numberCard: {
    type: INTEGER,
    allowNull: true
  },
  dueDate: {
    type: STRING,
    allowNull: true
  },
  clientName: {
    type: STRING,
    allowNull: true
  },
  createAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP')
  },
  updateAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP')
  }
}, {
  timestamps: false
})

export default PaymentCard