const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
const SizeModel = require('../information/size')
const colorModel = require('../information/color')
const CountriesModel = require('../information/CountriesModel')
const DepartmentsModel = require('../information/DepartmentsModel')
const CitiesModel = require('../information/CitiesModel')
const Feature = require('../feature/feature')
const CategoryProductsModel = require('../Categories/CategoryProducts')
const { enCode, validationID, validations } = require('../../utils/util')
const Users = require('../Users')
const Store = require('../Store/Store')
// const Store = require('../../Store')

// 

const productModel = sequelize.define('productFood', {
    pfId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) { return enCode(this.getDataValue(x)) },
    },
    // User
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: Users,
            key: 'id'
        },
        get(x) { return enCode(this.getDataValue(x)) }
    },
    // id store
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
    pName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ProPrice: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    ProDescuento: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    ProDescription: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    pState: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: 1,
    },
    sTateLogistic: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: 1,

    },
    // Numero de estrellas
    ProStar: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    ProImage: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    // ---------------------
    // Alto
    ProHeight: {
        type: Sequelize.STRING,
        defaultValue: 1
    },
    // Peso
    ProWeight: {
        type: Sequelize.STRING,
        defaultValue: 1
    },
    // -----------------------------Listo-----------------------------
    // Destacado
    ProOutstanding: {
        type: Sequelize.SMALLINT            
    },
    // Entrega
    ProDelivery: {
        type: Sequelize.SMALLINT,
        defaultValue: false

    },
    pDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    pDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = productModel