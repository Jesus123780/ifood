import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
import { enCode } from '../../utils/util'
import CitiesModel from '../information/CitiesModel'
import TypeIdentitiesModel from '../information/TypeIdentitiesModel'
const sequelize = connect()

const CustomersModel = sequelize.define('customers', {
  cId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  cName: {
    type: STRING(200),
    allowNull: false
  },
  cNit: {
    type: STRING(50),
    allowNull: false,
    unique: true
  },
  cNitDV: {
    type: STRING(10),
    allowNull: false
  },
  cPhone: {
    type: STRING(20),
    allowNull: false
  },
  cEmail: {
    type: STRING(50),
    allowNull: false,
    unique: true
  },
  cNumAdd: {
    type: STRING(30),
    allowNull: false
  },
  cNumStr: {
    type: STRING(30),
    allowNull: false
  },
  cNumHou: {
    type: STRING(30),
    allowNull: false
  },
  cInformation: {
    type: STRING(100),
    allowNull: true
  },
  cCharge: {
    type: STRING(50)
  },
  cState: {
    type: SMALLINT,
    allowNull: false
  },
  cDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  cDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},{
  timestamps: false
})

export default CustomersModel