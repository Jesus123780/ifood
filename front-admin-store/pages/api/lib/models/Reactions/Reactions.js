import { INTEGER, STRING, UUID, UUIDV4, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'

// 

const ReactionsModel = sequelize.define('reactions', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  content: {
    type: STRING,
    allowNull: false
  },
  uuid: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false
  },
  messageId: {
    type: INTEGER,
    allowNull: false
  },
  userId: {
    type: INTEGER,
    allowNull: false
  },
  rDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  rDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default ReactionsModel