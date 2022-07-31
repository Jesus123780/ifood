import { INTEGER, STRING, literal } from 'sequelize'
import connect from '../../db'
import { enCode } from '../../utils'
const sequelize = connect()
import { validationID } from '../../utils/util'
import FoldersModel from './FoldersModel'
// 

const FolderParentsModel = sequelize.define('folderParents', {
  fpId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  fId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: FoldersModel,
      key: 'fId'
    },
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('fId', validationID(x, false))}
  },
  parentId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: FoldersModel,
      key: 'fId'
    },
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('parentId', validationID(x, false))}
  },
  fpLevel: {
    type: INTEGER,
    allowNull: false
  },
  fpState: {
    type: STRING(100),
    allowNull: false
  },
  fpDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  fpDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

export default FolderParentsModel