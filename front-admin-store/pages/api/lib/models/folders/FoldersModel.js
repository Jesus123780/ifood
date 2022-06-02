import { INTEGER, STRING, TINYINT, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { validationID, enCode } from '../../utils/util'
import UsersModel from '../users/UsersModel'
// 

const FoldersModel = sequelize.define('folders', {
  fId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
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
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('uId', validationID(x, false))}
  },
  fName: {
    type: STRING(100),
    allowNull: false
  },
  fLevel: {
    type: TINYINT,
    allowNull: false
  },
  fState: {
    type: TINYINT,
    allowNull: false
  },
  fDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  fDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

export default FoldersModel