import Sequelize from 'sequelize'
let conn = null

export default function connect() {
    try {
        if (!conn) {
            conn = new Sequelize(
                process.env.NAMEDB, // Nombre de la db
                process.env.USERDB, // Nombre de usuario de la db
                process.env.PASSDB, // Contraseña de la db
                {
                    host: process.env.HOSTDB, // Host de la db
                    dialect: process.env.DIALECTDB // Motor de la db
                }
            )
        }
        // conn.sync()
        return conn
    } catch (error) {
        console.log('/**** No ha sido posible conectarse a la base de datos. ****/')
    }
}
