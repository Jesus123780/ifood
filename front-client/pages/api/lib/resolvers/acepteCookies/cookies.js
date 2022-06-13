import { COOKIE_OPTIONS } from 'utils'
import { ApolloError } from 'apollo-server-micro'

const setCookie = async (_parent, { name, value }, { setCookies }) => {
    console.log(setCookies)
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
        console.log(error)
        throw new ApolloError('Ocurrió un error al aceptar las cookies', 500, error)
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
