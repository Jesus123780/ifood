import { INTEGER, STRING, TINYINT, literal } from 'sequelize'
import connect from '../../db'
import { enCode } from '../../utils/util'
const sequelize = connect()

const ModulesModel = sequelize.define('modules', {
  mId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  mName: {
    type: STRING(100),
    allowNull: false
  },
  mPath: {
    type: STRING(50),
    allowNull: false
  },
  mPriority: {
    type: TINYINT,
    allowNull: false
  },
  mIcon: {
    type: TINYINT,
    allowNull: false
  },
  mState: {
    type: TINYINT,
    allowNull: false
  },
  mDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  mDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default ModulesModel