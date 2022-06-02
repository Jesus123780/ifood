import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import { enCode, validationID } from '../../utils/util'
import connect from '../../db'
const sequelize = connect()
import Products from '../product/product'
import GeneralFoldersModel from './GeneralFoldersModel'

const GeneralDocumentsModel = sequelize.define('generaldocuments',
  {
    gdId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get(x) { return enCode(this.getDataValue(x)) }
    },
    pId: {
      type: INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: Products,
        key: 'pId'
      },
      get(x) { return enCode(this.getDataValue(x)) },
      set(x) { return this.setDataValue('pId', validationID(x, false))}
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
      set(x) { return this.setDataValue('gfId', validationID(x, false)) }
    },
    gdName: {
      type: STRING(50),
      allowNull: false
    },
    gdSecNam: {
      type: STRING(50)
    },
    gdState: {
      type: SMALLINT,
      allowNull: false
    },
    gdDatCre: {
      type: 'TIMESTAMP',
      defaultValue: literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    gdDatMod: {
      type: 'TIMESTAMP',
      defaultValue: literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

export default GeneralDocumentsModel