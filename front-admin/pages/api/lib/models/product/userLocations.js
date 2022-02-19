const Sequelize = require('sequelize')
const connect = require('../../db')
const { enCode } = require('../../utils/util')
const CitiesModel = require('../information/CitiesModel')
const CountriesModel = require('../information/CountriesModel')
const DepartmentsModel = require('../information/DepartmentsModel')
const Users = require('../Users')
const sequelize = connect()

sequelize.sync()

const UserLocation = sequelize.define('userLocation', {
    locationId: {
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
        get(x) { return enCode(this.getDataValue(x)) }
    },
    // Locations
    cId: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
            model: CitiesModel,
            key: 'ctId'
        },
        get(x) { return enCode(this.getDataValue(x)) }
    },
    // latitud
    uLatitud: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    // longitude
    uLongitude: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    uLocationKnow: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    uPiso: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    uLocationState: {
        type: Sequelize.TINYINT,
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

module.exports = UserLocation