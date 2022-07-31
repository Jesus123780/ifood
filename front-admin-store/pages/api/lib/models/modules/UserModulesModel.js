import { INTEGER, TINYINT, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import ModulesModel from './ModulesModel'
import UsersModel from '../users/UsersModel'
import { enCode, validationID } from '../../utils/util'
/**
 * @deprecated
 */
const UserModulesModel = sequelize.define('usermodules', {
  umdId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  mId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: ModulesModel,
      key: 'mId'
    },
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('mId', validationID(x, false))}
  },
  umId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: UsersModel,
      key: 'umId'
    },
    get(x) {return enCode(this.getDataValue(x))}
  },
  umdState: {
    type: TINYINT,
    allowNull: false
  },
  umdPriority: {
    type: TINYINT,
    allowNull: false
  },
  umdDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  umdDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

export default UserModulesModel