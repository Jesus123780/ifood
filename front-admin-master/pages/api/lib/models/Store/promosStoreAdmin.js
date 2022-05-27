import Sequelize from 'sequelize'
import connect from '../../db'
import Store from './Store'
import Users from '../Users'
import { enCode } from '../../utils/util'
import StoryModel from './StoryModel'

const conn = connect()
()
export default conn.define('promoDashboardStoreAdmins', {
    pSoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) { return enCode(this.getDataValue(x)) }
    },
    comments: {
        type: Sequelize.STRING,
        allowNull: false
    },
    metaTags: {
        type: Sequelize.STRING,
        allowNull: true
    },
    urlImage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    mainName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bPromoState: {
        type: Sequelize.SMALLINT(6),
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
