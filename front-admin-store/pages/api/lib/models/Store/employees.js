import Sequelize from 'sequelize'
import connect from '../../db'
import Store from './Store'
import Users from '../Users'
import { enCode } from '../../utils/util'

const conn = connect()

export default conn.define('employees', {
  eId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  idStore: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Store,
      key: 'idStore'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  idUser: {
    type: Sequelize.INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Users,
      key: 'id'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  eEnterprise: {
    type: Sequelize.SMALLINT(6),
    allowNull: true,
    defaultValue: 1
  },
  eSalary: {
    type: Sequelize.INTEGER(2),
    allowNull: true,
    defaultValue: 0
  },
  typeContract: {
    type: Sequelize.STRING
  },
  termContract: {
    type: Sequelize.STRING,
    allowNull: true
  },
  eDatAdm: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  eDatRet: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  eArl: {
    type: Sequelize.STRING,
    allowNull: true
  },
  eBoxComp: {
    type: Sequelize.STRING,
    allowNull: true
  },
  eState: {
    type: Sequelize.SMALLINT(6),
    allowNull: true,
    defaultValue: 1
  },
  tpNumDoc: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true
  },
  tpName: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true
  },
  tpLasNam: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tpPhone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tpEmail: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tpState: {
    type: Sequelize.STRING,
    allowNull: true
  },
  createAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updateAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  timestamps: false
})
