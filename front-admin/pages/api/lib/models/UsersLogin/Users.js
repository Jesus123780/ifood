import { INTEGER, STRING, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode, validationID } from '../../utils/util'
import UsersModel from '../users/UsersModel'

// 

const userSessionsModel = sequelize.define('usersessions', {
  usId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  uId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: UsersModel,
      key: 'uId'
    },
    unique: true,
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('uId', validationID(x, false)) }
  },
  usToken: {
    type: STRING(255),
    allowNull: false
  },
  usSessionID: {
    type: STRING(255),
    allowNull: false
  },
  usDevice: {
    type: STRING(255)
  },
  usIP: {
    type: STRING(255)
  },
  usState: {
    type: INTEGER,
    allowNull: false
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

})

export default userSessionsModel