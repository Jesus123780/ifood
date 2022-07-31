
import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
import CitiesModel from '../information/CitiesModel'
import CountriesModel from '../information/CountriesModel'
import TypeIdentitiesModel from '../information/TypeIdentitiesModel'
import DepartmentsModel from '../information/DepartmentsModel'
import { enCode, validationID } from '../../utils/util'
const sequelize = connect()

// 

const ThirdPartiesModel = sequelize.define('thirdparties', {
  tpId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  countryId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: CountriesModel,
      key: 'cId'
    },
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('countryId', validationID(x, false))}
  },
  dId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: DepartmentsModel,
      key: 'dId'
    },
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('dId', validationID(x, false))}
  },
  ctId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: CitiesModel,
      key: 'ctId'
    },
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('cId', validationID(x, false))}
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
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('tiId', validationID(x, false))}
  },
  tpNitDV: {
    type: STRING(2),
    allowNull: true
  },
  tpNumDoc: {
    type: STRING(15),
    allowNull: false
    // unique: true
  },
  tpName: {
    type: STRING(100),
    allowNull: false
  },
  tpLasNam: {
    type: STRING(100),
    allowNull: false
  },
  tpPhone: {
    type: STRING(20),
    allowNull: false
  },
  tpEmail: {
    type: STRING(100),
    allowNull: false
    // unique: true
  },
  tpDir: {
    type: STRING(100),
    allowNull: false
  },
  tpState: {
    type: SMALLINT,
    allowNull: false
  },
  tpDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  tpDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default ThirdPartiesModel