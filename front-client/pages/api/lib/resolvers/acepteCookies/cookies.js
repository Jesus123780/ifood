import { COOKIE_OPTIONS } from 'utils'

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
        console.log(error, 'hola')
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
