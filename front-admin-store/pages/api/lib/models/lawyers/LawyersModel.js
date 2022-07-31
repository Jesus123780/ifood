import { INTEGER, STRING, TINYINT, literal } from 'sequelize'
import { enCode, validationID } from '../../utils/util'
import connect from '../../db'
const sequelize = connect()
import ThirdPartiesModel from '../thirdParties/ThirdPartiesModel'

// 

const LawyersModel = sequelize.define('lawyers', {
  lId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  tpId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: ThirdPartiesModel,
      key: 'tpId'
    },
    unique: true,
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('tpId', validationID(x, false))}
  },
  lCollectionEntity: {
    type: STRING,
    allowNull: false
  },
  lFee: {
    type: STRING,
    allowNull: false
  },
  lState: {
    type: TINYINT,
    allowNull: false
  },
  lDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  lDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

export default LawyersModel