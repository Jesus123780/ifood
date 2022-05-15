import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
import { enCode, validationID } from '../../utils/util'
import UserMastersModel from './userMasterModel'
const sequelize = connect()

const UsersModel = sequelize.define('usersNot', {
  uId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  umId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: UserMastersModel,
      key: 'umId'
    },
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('umId', validationID(x, false))}
  },
  uName: {
    type: STRING(100),
    allowNull: false
  },
  uLasNam: {
    type: STRING(100),
    allowNull: false
  },
  uPhone: {
    type: STRING(20),
    allowNull: false
  },
  uEmail: {
    type: STRING(100),
    allowNull: false,
    unique: true
  },
  uPassword: {
    type: STRING(100),
    allowNull: false
  },
  uToken: {
    type: STRING(100)
  },
  uState: {
    type: SMALLINT,
    allowNull: false
  },
  uDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  uDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

export default UsersModel