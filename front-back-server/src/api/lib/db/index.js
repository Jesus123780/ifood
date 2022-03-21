// 'use strict'

// const Sequelize = require('sequelize')
// let sequelize = null

// module.exports = function connect () {
//     try {
//         if (!sequelize) {
//             sequelize = new Sequelize(
//                 'app', //nombre Base de datos process.env.NAMEDB
//                 'root', //nombre usuario base de datos process.env.USERDB
//                 '', // clave de base de datos, process.env.PASSDB
//                 {
//                     host: 'localhost', //process.env.HOSTDB
//                     dialect: 'mysql' //process.env.DIALECTDB
//                 }
//             )
//         }
//         // sequelize.sync()
//         return sequelize
//     } catch (error) {
//         console.log('/**** Error de conexión con base de datos, algunos datos erroneos o el .env no existe.')
//     }
// }

'use strict'

const Sequelize = require('sequelize')
let sequelize = null

module.exports = function connect () {
    try {
        if (!sequelize) {
            sequelize = new Sequelize(
                process.env === 'production' ? '9F27g24N1A' : 'app', //nombre Base de datos process.env.NAMEDB
                process.env === 'production' ? '9F27g24N1A' : 'root', //nombre usuario base de datos process.env.USERDB
                process.env === 'production' ? 'yGDyGrHvYa' : '', // clave de base de datos, process.env.PASSDB
                {
                    host:  process.env === 'production' ? 'remotemysql.com' : 'localhost', //process.env.HOSTDB
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