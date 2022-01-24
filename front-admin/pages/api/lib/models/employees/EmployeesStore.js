const Sequelize = require('sequelize')
const connect = require('../../db')
const AreasModel = require('../areas/AreasModel')
const sequelize = connect()
const { enCode, validationID } = require('../../utils/util')
const ThirdPartiesModel = require('../thirdParties/ThirdPartiesModel')
const Users = require('../Users')
const Store = require('../Store/Store')
sequelize.sync()
const EmployeesModelStore = sequelize.define('employeestore', {
    eId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) { return enCode(this.getDataValue(x)) }
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
    idEmployee: {
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
    eSalary: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    typeContract: {
        type: Sequelize.STRING(50),
    },
    
    termContract: {
        type: Sequelize.STRING(50),
    },
    eDatAdm: {
        type: Sequelize.DATE,
        allowNull: true
    },
    eState: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    eDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    eDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = EmployeesModelStore