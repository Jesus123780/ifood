import { INTEGER, TINYINT, literal } from 'sequelize'
import connect from '../../db'
import { validationID, enCode } from '../../utils/util'
const sequelize = connect()
import SubModulesModel from '../subModules/SubModulesModel'
import Users from '../UsersLogin/Users'

const UserPermitsModel = sequelize.define('userpermits', {
  upId: {
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
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('id', validationID(x, false))}
  },
  smId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: SubModulesModel,
      key: 'smId'
    },
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('smId', validationID(x, false))}
  },
  upState: {
    type: TINYINT,
    allowNull: false
  },
  upDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  upDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false,
  hooks: {
    afterBulkCreate: (model) => {return model}
  }
})

export default UserPermitsModel