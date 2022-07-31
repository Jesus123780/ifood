import { INTEGER, STRING, literal } from 'sequelize'
import { enCode, validationID } from '../../utils/util'
import connect from '../../db'
import Users from '../Users'
import CountriesModel from '../information/CountriesModel'
import DepartmentsModel from '../information/DepartmentsModel'
import CitiesModel from '../information/CitiesModel'
const sequelize = connect()

// 

const Userprofile = sequelize.define('userprofile', {
  upId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  id: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Users,
      key: 'id'
    },
    unique: true,
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('id', validationID(x, false)) }
  },
  upPhone: {
    type: STRING(20),
    allowNull: true
  },
  upImage: {
    type: STRING(200),
    allowNull: true
  },
  upDateBir: {
    type: STRING(50),
    allowNull: true
  },
  upAddress: {
    type: STRING(100),
    allowNull: true
  },
  // Locations
  cId: {
    type: INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: CountriesModel,
      key: 'cId'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  dId: {
    type: INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: true,
    references: {
      model: DepartmentsModel,
      key: 'dId'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  ctId: {
    type: INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: true,
    references: {
      model: CitiesModel,
      key: 'ctId'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  upZipCode: {
    type: STRING(150),
    allowNull: true
  },
  upLatitude: {
    type: STRING(150),
    allowNull: true
  },
  upLongitude: {
    type: STRING(150),
    allowNull: true
  },
  createAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP')
  },
  updateAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP')
  }
}, {
  timestamps: false
})

export default Userprofile