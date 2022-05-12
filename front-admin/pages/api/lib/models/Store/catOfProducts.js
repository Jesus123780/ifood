import { INTEGER, STRING, literal } from 'sequelize'
import connect from '../../db'
import { enCode } from '../../utils/util'
import Users from '../Users'
const sequelize = connect()

const catOfProducts = sequelize.define('categoriadeproductos', {
  cpId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
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
  catName: {
    type: STRING,
    allowNull: false
  },
  catDescription: {
    type: STRING,
    allowNull: true
  },
  schState: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1
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

export default catOfProducts