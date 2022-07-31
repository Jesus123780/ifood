import { INTEGER, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import EmployeesFoldersModel from './EmployeesFoldersModel'
import { enCode, validationID } from '../../utils/util'

const EmployeesFoldersParentsModel = sequelize.define('employeesFoldersParents', {
  efpId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  efId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: EmployeesFoldersModel,
      key: 'efId'
    },
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('efId', validationID(x, false)) }
  },
  parentId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: EmployeesFoldersModel,
      key: 'efId'
    },
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('parentId', validationID(x, false)) }
  },
  efpLevel: {
    type: INTEGER(4),
    allowNull: false,
    defaultValue: 1
  },
  efpState: {
    type: SMALLINT,
    allowNull: false,
    defaultValue: 1
  },
  efpDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  efpDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default EmployeesFoldersParentsModel