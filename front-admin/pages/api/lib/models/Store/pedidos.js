const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
const { enCode } = require('../../utils/util')
const productModelFood = require('../product/productFood')
const Users = require('../Users')
const Store = require('./Store')

sequelize.sync()

const pedidosModel = sequelize.define('storepedidos', {
    pdpId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) { return enCode(this.getDataValue(x)) },
    },
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: Users,
            key: 'id'
        },
        get(x) { return enCode(this.getDataValue(x)) },
    },
    pId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: productModelFood,
            key: 'pId'
        },
        get(x) { return enCode(this.getDataValue(x)) },
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
        get(x) { return enCode(this.getDataValue(x)) },
    },
    ppState: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0

    },
    pCodeRef: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    pPDate: {
        type: Sequelize.DATE,
        // defaultValue: Date.now()
    },
    pPStateP: {
        type: Sequelize.TINYINT,
        defaultValue: 0
    },
    payMethodPState: {
        type: Sequelize.TINYINT,
        defaultValue: 0
    },
    pPRecoger: {
        type: Sequelize.TINYINT,
        defaultValue: 0
    },
    unidProducts: {
        type: Sequelize.INTEGER,
        allowNull: false
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

module.exports = pedidosModel