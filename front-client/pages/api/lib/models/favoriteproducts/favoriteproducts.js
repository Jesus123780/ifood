const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
const { enCode } = require('../../utils/util')

sequelize.sync()

const FavoriteProductUsers = sequelize.define('favoriteProductUser', {
    fpUserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) {return enCode(this.getDataValue(x))}
    },
    
    createAt: {
        type: Sequelize.DATE,
        default: Date.now()
    }

})

module.exports = FavoriteProductUsers