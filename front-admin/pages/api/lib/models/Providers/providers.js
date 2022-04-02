const Sequelize = require('sequelize')
const { enCode } = require('../../utils/util')
const connect = require('../../db')
const Users = require('../Users')
const Store = require('../Store/Store')
const sequelize = connect()

// 
sequelize.sync()

const Providers = sequelize.define('providers', {
    idProvider: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) {return enCode(this.getDataValue(x))}
    },
     // id store
     idStore: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: Store,
            key: 'idStore'
        },
        get(x) { return enCode(this.getDataValue(x)) }
    },
    // User
    id: {
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
    prName: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    prImage: {
        type: Sequelize.STRING,
        trim: true,
        allowNull: true
    },
    PrCode: {
        type: Sequelize.STRING(100),
        trim: true,
        allowNull: true
    },
    prPathImage: {
        type: Sequelize.STRING,
        trim: true,
        allowNull: true
    },
    PrNit: {
        type: Sequelize.STRING,
        trim: true,
        allowNull: true
    },
    PrNumberPhone: {
        type: Sequelize.STRING,
        trim: true,
        unique: true,
        allowNull: true
    },
    PrNumberIdentity: {
        type: Sequelize.STRING,
        trim: true,
        unique: true,
        allowNull: true
    },
    PrAdres: {
        type: Sequelize.STRING,
        trim: true,
        allowNull: true
    },
    PrMail: {
        type: Sequelize.STRING,
        trim: true,
        allowNull: true
    },
    TotalBysPr: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    TotalDeuda: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    prState: {
        type: Sequelize.SMALLINT(6),
        allowNull: false,
        defaultValue: 1
    },
    DatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    DatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = Providers