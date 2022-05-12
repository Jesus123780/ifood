import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
import CustomersModel from '../customers/CustomersModel'
import CitiesModel from '../information/CitiesModel'
import TypeIdentitiesModel from '../information/TypeIdentitiesModel'
import { enCode } from '../../utils/util'
const sequelize = connect()

const CostCentersModel = sequelize.define('costcenters', {
  ccId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  cId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: CustomersModel,
      key: 'cId'
    },
    get(x) {return enCode(this.getDataValue(x))}
  },
  tiId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: TypeIdentitiesModel,
      key: 'tiId'
    },
    get(x) {return enCode(this.getDataValue(x))}
  },
  cityId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: CitiesModel,
      key: 'cId'
    },
    get(x) {return enCode(this.getDataValue(x))}
  },
  ccName: {
    type: STRING(200),
    allowNull: false
  },
  ccNit: {
    type: STRING(50),
    allowNull: false,
    unique: true
  },
  ccNitDV: {
    type: STRING(10),
    allowNull: false
  },
  ccPhone: {
    type: STRING(20),
    allowNull: false
  },
  ccContact: {
    type: STRING(50)
  },
  ccConPho: {
    type: STRING(20)
  },
  ccEmail: {
    type: STRING(50),
    allowNull: false,
    unique: true
  },
  ccNumAdd: {
    type: STRING(30),
    allowNull: false
  },
  ccNumStr: {
    type: STRING(30),
    allowNull: false
  },
  ccNumHou: {
    type: STRING(30),
    allowNull: false
  },
  ccInformation: {
    type: STRING(100)
  },
  ccState: {
    type: SMALLINT,
    allowNull: false
  },
  ccDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  ccDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

export default CostCentersModel