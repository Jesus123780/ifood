import { INTEGER, STRING, TINYINT, literal } from 'sequelize'
import connect from '../../db'
import { enCode } from '../../utils/util'
import CitiesModel from '../information/CitiesModel'
import CountriesModel from '../information/CountriesModel'
import DepartmentsModel from '../information/DepartmentsModel'
import Users from '../Users'
const sequelize = connect()

sequelize.sync()

const UserLocation = sequelize.define('userLocation', {
  locationId: {
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
    get(x) { return enCode(this.getDataValue(x)) }
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
  // latitud
  uLatitud: {
    type: INTEGER,
    allowNull: true
  },
  // longitude
  uLongitude: {
    type: INTEGER,
    allowNull: true
  },
  uLocationKnow: {
    type: STRING,
    allowNull: true
  },
  uPiso: {
    type: TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  uLocationState: {
    type: TINYINT,
    defaultValue: 1
  },
  DatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  DatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default UserLocation