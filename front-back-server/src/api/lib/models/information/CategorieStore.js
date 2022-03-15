const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
const { enCode } = require('../../utils/util')



const CatStore = sequelize.define('catstore', {
    catStore: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) {return enCode(this.getDataValue(x))}
    },
    cName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    csDescription: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cState: {
        type: Sequelize.SMALLINT,
        defaultValue: 1
    },
    cPathImage: {
        type: Sequelize.STRING
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

module.exports = CatStore