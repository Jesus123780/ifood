import { COOKIE_OPTIONS } from 'utils'
import { ApolloError } from 'apollo-server-micro'

const setCookie = async (_parent, { name, value }, { setCookies }) => {
    console.log(name, value)
    try {
        const refreshTokenExpiry = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000)
        setCookies.push({
            name: process.env.ACEPTE_COOKIE,
            value: true,
            options: {
                ...COOKIE_OPTIONS,
                expires: refreshTokenExpiry
            }
        })
    } catch (error) {
        throw new ApolloError('Ocurrió un error al aceptar las cookies', 500, e)
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
    },
    MUTATIONS: {
        setCookie,
    }
}
