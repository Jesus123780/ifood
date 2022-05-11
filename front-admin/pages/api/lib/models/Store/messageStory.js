import Sequelize from 'sequelize'
import connect from '../../db'
import { enCode } from '../../utils/util'
import StoryModel from './StoryModel'

const conn = connect()
conn.sync()
export default conn.define('storycomment', {
  cStoId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  stoId: {
    type: Sequelize.INTEGER,
    allowNull: true,    
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: StoryModel,
      key: 'stoId'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  from: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  comments: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  messageState: {
    type: Sequelize.SMALLINT(6),
    allowNull: false
  },
  createAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updateAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  timestamps: false
})
