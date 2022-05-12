import { INTEGER, STRING, TEXT, TINYINT, literal } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import SizeModel from '../information/size'
import colorModel from '../information/color'
import CountriesModel from '../information/CountriesModel'
import DepartmentsModel from '../information/DepartmentsModel'
import CitiesModel from '../information/CitiesModel'
import Feature from '../feature/feature'
import CategoryProductsModel from '../Categories/CategoryProducts'
import { enCode, validationID } from '../../utils/util'

sequelize.sync()

const productModel = sequelize.define('product', {
  pId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  // Talla
  sizeId: {
    type: INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: SizeModel,
      key: 'sizeId'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  // color
  colorId: {
    type: INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: colorModel,
      key: 'colorId'
    },
    get(x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
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
  fId: {
    type: INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Feature,
      key: 'fId'
    },
    get(x) { return enCode(this.getDataValue(x)) },
    set(x) { this.setDataValue('fId', validationID(x, false)) }
  },
  caId: {
    type: INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: CategoryProductsModel,
      key: 'caId'
    },
    get(x) {return enCode(this.getDataValue(x))},
    set(x) {this.setDataValue('caId', validationID(x, false))}
  },
  // poPriority: {
  //     type: Sequelize.SMALLINT,
  //     allowNull: false,
  //     defaultValue: 1,
  //     validate: {
  //         isValidate (value) {
  //             validations(value, false, false, 0, 0, false, true)
  //         }
  //     }
  // },
  pName: {
    type: STRING,
    allowNull: false
  },
  ProPrice: {
    type: STRING,
    allowNull: true
  },
  ProDescuento: {
    type: INTEGER,
    allowNull: true
  },
  ProUniDisponibles: {
    type: INTEGER,
    allowNull: true
  },
  ProDescription: {
    type: TEXT,
    allowNull: true
  },
  pState: {
    type: TINYINT,
    allowNull: false
  },
  sTateLogistic: {
    type: TINYINT,
    allowNull: false
  },
  // Si el producto esta asegurado ( Protegido )
  ProProtegido: {
    type: INTEGER,
    allowNull: true
  },
  // GARANTÍA )
  ProAssurance: {
    type: STRING,
    allowNull: true
  },
  // Numero de estrellas
  ProStar: {
    type: INTEGER,
    allowNull: true
  },
  ProImage: {
    type: STRING,
    trim: true,
    allowNull: true
  },
  // ---------------------
  // Ancho
  ProWidth: {
    type: INTEGER
  },
  // Alto
  ProHeight: {
    type: INTEGER,
    defaultValue: 1
  },
  // Largo
  ProLength: {
    type: STRING,
    defaultValue: 1
  },
  // Peso
  ProWeight: {
    type: STRING,
    defaultValue: 1
  },
  // -----------------------------Listo-----------------------------
  // Cantidad
  ProQuantity: {
    type: INTEGER,
    allowNull: true
  },
  // Destacado
  ProOutstanding: {
    type: INTEGER
  },
  // Entrega
  ProDelivery: {
    type: INTEGER
  },
  // Entrega
  ProVoltaje: {
    type: STRING,
    allowNull: true
  },
  pDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  pDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
})

export default productModel