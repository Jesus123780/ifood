'use strict'

const Sequelize = require('sequelize')
let sequelize = null

module.exports = function connect () {
    try {
        if (!sequelize) {
            sequelize = new Sequelize(
                'app', //nombre Base de datos process.env.NAMEDB
                'root', //nombre usuario base de datos process.env.USERDB
                '', // clave de base de datos, process.env.PASSDB
                {
                    host: 'localhost', //process.env.HOSTDB
                    dialect: 'mysql' //process.env.DIALECTDB
                }
            )
        }
        // sequelize.sync()
        return sequelize
    } catch (error) {
        console.log('/**** Error de conexión con base de datos, algunos datos erroneos o el .env no existe.')
    }
}