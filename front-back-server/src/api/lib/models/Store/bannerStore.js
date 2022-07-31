import Sequelize from 'sequelize'
import connect from '../../db'
import Store from './Store'
import { enCode } from '../../utils/util'

const conn = connect()

export default conn.define('bannerstore', {
    bnId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) { return enCode(this.getDataValue(x)) }
    },
    idStore: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        unique: true,
        references: {
            model: Store,
            key: 'idStore'
        },
        get(x) { return enCode(this.getDataValue(x)) }
    },
    bnState: {
        type: Sequelize.SMALLINT(6),
        allowNull: false,
        defaultValue: 1
    },
    bnImage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bnImageFileName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    path: {
        type: Sequelize.STRING,
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
