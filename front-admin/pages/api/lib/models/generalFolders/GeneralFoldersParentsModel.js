import { INTEGER, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
import { enCode, validationID } from '../../utils/util'
const sequelize = connect()
import GeneralFoldersModel from './GeneralFoldersModel'

const GeneralFoldersParentsModel = sequelize.define('generalFoldersParents', {
  gfpId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  gfId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: GeneralFoldersModel,
      key: 'gfId'
    },
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('gfId', validationID(x, false)) }
  },
  parentId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: GeneralFoldersModel,
      key: 'gfId'
    },
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('parentId', validationID(x, false)) }
  },
  gfpLevel: {
    type: INTEGER(4),
    allowNull: false,
    defaultValue: 1
  },
  gfpState: {
    type: SMALLINT,
    allowNull: false,
    defaultValue: 1
  },
  gfpDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  gfpDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default GeneralFoldersParentsModel