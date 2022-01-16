import Sequelize from 'sequelize'
import connect from '../../db'
import { enCode } from '../../utils/util'
import Store from './Store'
import Users from '../Users'

const conn = connect()

// conn.sync() 

export default conn.define('catofproducts', {
    cpId: {
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
    timestamps: false
})
