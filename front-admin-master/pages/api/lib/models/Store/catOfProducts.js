const Sequelize = require('sequelize')
const connect = require('../../db')
const { enCode } = require('../../utils/util')
const Users = require('../Users')
const Store = require('./Store')
const sequelize = connect()


sequelize.sync()

const catOfProducts = sequelize.define('categoriadeproductos', {
    cpId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) {return enCode(this.getDataValue(x))}
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
    catName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    catDescription: {
        type: Sequelize.STRING,
        allowNull: true
    },
    schState: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
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
    timestamps: false,
})

module.exports = catOfProducts