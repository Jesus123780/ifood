import Sequelize from 'sequelize'
import connect from '../../db'
import { enCode, validationID } from '../../utils/util'
import Store from './Store'
import Users from '../Users'

const conn = connect()

conn.sync()

export default conn.define('storechedules', {
    schId: {
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
        get(x) {return enCode(this.getDataValue(x))},
        set(x) {this.setDataValue('id', validationID(x, false))}
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
        get(x) {return enCode(this.getDataValue(x))},
        set(x) {this.setDataValue('idStore', validationID(x, false))}
    },
    schDay: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    schHoSta: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    schHoEnd: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    schState: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    timestamps: false
})
