import { INTEGER, STRING, TINYINT, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import ModulesModel from '../modules/ModulesModel'
import { enCode, validationID } from '../../utils/util'
const SubModulesModel = sequelize.define('submodules', {
  smId: {
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
  smName: {
    type: STRING(100),
    allowNull: false
  },
  smPath: {
    type: STRING(50),
    allowNull: false
  },
  smPriority: {
    type: TINYINT,
    allowNull: false
  },
  smState: {
    type: TINYINT,
    allowNull: false
  },
  smDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  smDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default SubModulesModel