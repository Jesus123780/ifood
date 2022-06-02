'use strict'

import Sequelize from 'sequelize'
let sequelize = null

// eslint-disable-next-line consistent-return
export default function connect () {
  try {
    if (!sequelize) {
      sequelize = new Sequelize(
        process.env.NAMEDB, //nombre Base de datos process.env.NAMEDB
        process.env.USERDB, //nombre usuario base de datos process.env.USERDB
        process.env.PASSDB, // clave de base de datos, process.env.PASSDB
        {
          host: process.env.HOSTDB, //process.env.HOSTDB
          // port: process.env.MYSQLPORT || 6695,
          dialect: process.env.DIALECTDB //process.env.DIALECTDB
        }
        
      )
    }
    // 
    return sequelize
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('/**** Error de conexión con base de datos, algunos datos erroneos o el .env no existe.')
  }
}