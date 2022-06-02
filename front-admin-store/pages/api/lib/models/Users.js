
import { INTEGER, STRING, DATE } from 'sequelize'
import connect from '../db'
import { enCode } from '../utils/util'
const sequelize = connect()
// 

const Users = sequelize.define('users', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) {return enCode(this.getDataValue(x))}
  },
  name: {
    type: STRING,
    require: true
  },
  username: {
    type: STRING,
    require: true,
    trim: true,
    unique: true
  },
  lastName: {
    type: STRING,
    require: true,
    trim: true,
    unique: true
  },
  email: {
    type: STRING,
    require: true,
    trim: true,
    unique: true
  },
  avatar: {
    type: STRING,
    trim: true
  },
  // News
  uToken: {
    type: STRING(100),
    trim: true
  },
  uPhoNum: {
    type: STRING(50)
  },
  ULocation: {
    type: STRING(100)
  },
  upLat: {
    type: STRING(30)
  },
  uState: {
    type: INTEGER(30)
  },
  upLon: {
    type: STRING(30)
  },
  upIdeDoc: {
    type: STRING(50)
  },
  siteWeb: {
    type: STRING,
    trim: true
  },
  description: {
    type: STRING,
    trim: true
  },
  password: {
    type: STRING,
    trim: true,
    require: true
  },
  createAt: {
    type: DATE,
    default: Date.now()
  }

})

export default Users