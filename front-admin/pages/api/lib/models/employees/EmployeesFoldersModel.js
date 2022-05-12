'use strict'

import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
import { enCode, validationID } from '../../utils/util'
const sequelize = connect()
import EmployeesModel from './EmployeesModel'

const EmployeesFoldersModel = sequelize.define('employeesFolders', {
  efId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  eId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: EmployeesModel,
      key: 'eId'
    },
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('eId', validationID(x, false)) }
  },
  efName: {
    type: STRING(60),
    allowNull: false,
    defaultValue: 'New Folder'
  },
  efLevel: {
    type: INTEGER(4),
    allowNull: false,
    defaultValue: 1
  },
  efState: {
    type: SMALLINT,
    allowNull: false,
    defaultValue: 1
  },
  efDatCre: {
    type: 'TIMESTAMP', 
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  efDatMod: {
    type:'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default EmployeesFoldersModel