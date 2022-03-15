const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
const { enCode } = require('../../utils/util')
const productModelFood = require('../product/productFood')
const Users = require('../Users')
const productsOptionalExtra = require('../../models/product/productsOptionalExtra')

sequelize.sync()

const SubProducts = sequelize.define('subproducts', {
    subProductsId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) { return enCode(this.getDataValue(x)) }
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
    opExPid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: productsOptionalExtra,
            key: 'opExPid'
        },
        get(x) { return enCode(this.getDataValue(x)) },
    },
    cDatCre: {
        type: Sequelize.DATE,
        default: Date.now()
    },
    cDatMod: {
        type: Sequelize.DATE,
        default: Date.now()
    }
}, {
    timestamps: false
})



module.exports = SubProducts