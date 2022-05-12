'use strict'

import { INTEGER, STRING, SMALLINT, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import ProductsModel from '../product/product'
import AreasModel from '../areas/AreasModel'
import { enCode, validationID } from '../../utils/util'

const GeneralFoldersModel = sequelize.define('generalfolders', {
  gfId: {
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
      model: ProductsModel,
      key: 'pId'
    },
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('pId', validationID(x, false)) }
  },
  aId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: AreasModel,
      key: 'aId'
    },
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('aId', validationID(x, false)) }
  },
  gfName: {
    type: STRING(60),
    allowNull: false,
    defaultValue: 'New Folder'
  },
  gfLevel: {
    type: INTEGER(4),
    allowNull: false,
    defaultValue: 1
  },
  gfState: {
    type: SMALLINT,
    allowNull: false,
    defaultValue: 1
  },
  gfDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  gfDatMod: {
    type:'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default GeneralFoldersModel