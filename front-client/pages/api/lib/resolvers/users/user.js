import { ApolloError } from 'apollo-server-micro'
import Users from '../../models/Users'
import { generateToken } from '../../utils'
import { Op } from 'sequelize'

export const newRegisterUser = async (_, input) => {
    const { name, password, email, username } = input
    try {
        const [user, _created] = await Users.findOrCreate({
            where: { email: email },
            defaults: {
                name,
                password,
                email,
                username
            }
        })
        const tokenGoogle = {
            name: name,
            username: username,
            restaurant: null,
            id: user.id
        }
        const tokenGo = await generateToken(tokenGoogle)
        return {
            token: tokenGo,
            roles: false,
            storeUserId: null,
            success: true,
            userId: user.id,
            message: `Bienvenido ${name}`,
        }
    } catch (e) {
        console.log(e)
        const error = new ApolloError('Lo sentimos, ha ocurrido un error interno', 400)
        return error
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
    },
    MUTATIONS: {
        newRegisterUser,
    }
}
