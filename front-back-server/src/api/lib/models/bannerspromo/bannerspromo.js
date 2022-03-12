import Sequelize from 'sequelize'
import connect from '../../db'
import { enCode } from '../../utils/util'

const conn = connect()
conn.sync()
export default conn.define('bannerspromo', {
    bpId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) { return enCode(this.getDataValue(x)) }
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bpState: {
        type: Sequelize.SMALLINT(6),
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
