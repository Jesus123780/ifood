const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
// const SizeModel = require('../../../information/size')
// const colorModel = require('../information/color')
// const CountriesModel = require('../information/CountriesModel')
// const DepartmentsModel = require('../information/DepartmentsModel')
// const CitiesModel = require('../information/CitiesModel')
// const Feature = require('../feature/feature')
// const CategoryProductsModel = require('../Categories/CategoryProducts')
const { enCode, validationID, validations } = require('../../utils/util')
const Users = require('../Users')
// const Store = require('../Store/Store')
// const catProducts = require('../Store/cat')

sequelize.sync()

const productModelFood = sequelize.define('productmodelfood', {
    pId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) { return enCode(this.getDataValue(x)) },
    },
    // id store
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
    ValueDelivery: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    ProUniDisponibles: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    ProDescription: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    pState: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    sTateLogistic: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    // Si el producto esta asegurado ( Protegido )
    ProProtegido: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    // GARANTÍA )
    ProAssurance: {
        type: Sequelize.STRING,
        allowNull: true
    },
    // Numero de estrellas
    ProStar: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    ProImage: {
        type: Sequelize.STRING,
        trim: true,
        allowNull: true
    },
    // ---------------------
    // Ancho
    ProWidth: {
        type: Sequelize.INTEGER,
    },
    // Alto
    ProHeight: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    // Largo
    ProLength: {
        type: Sequelize.STRING,
        defaultValue: 1
    },
    // Peso
    ProWeight: {
        type: Sequelize.STRING,
        defaultValue: 1
    },
    // -----------------------------Listo-----------------------------
    // Cantidad
    ProQuantity: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    // Destacado
    ProOutstanding: {
        type: Sequelize.INTEGER
    },
    // Entrega
    ProDelivery: {
        type: Sequelize.INTEGER
    },
    // Entrega
    ProVoltaje: {
        type: Sequelize.STRING,
        allowNull: true
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

module.exports = productModelFood