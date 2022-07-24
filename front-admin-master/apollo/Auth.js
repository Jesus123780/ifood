import React, { useEffect, useState, Fragment } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { isLoggedVar } from './cache'
import { UPDATE_TOKEN } from './queries'
import { useRouter } from 'next/router'
import { getDeviceId } from './apolloClient'

export default function Auth({ children }) {
    const [updateToken, { data, called }] = useMutation(UPDATE_TOKEN)
    const [isMount, setIsMount] = useState(false)
    const location = useRouter()

    // Actualiza el auth token del usuario por cada cambio de ventana
    const { data: dataLogged } = useQuery(gql`
        query IsUserLoggedIn {
            isLogged @client
        }`
    )

    // Verifica el token
    useEffect(() => {
        updateToken().catch(() => setIsMount(true))
    }, [updateToken])

    // Respuesta de la verificación del token
    useEffect(() => {
        const res = data?.refreshUserPayrollToken
        if (called && res) {
            setIsMount(true)
            if (res.restaurant) {
                localStorage.setItem('restaurant', res.restaurant)
                isLoggedVar({ state: true, expired: false })
            } else {
                localStorage.clear()
                const res = localStorage.getItem('restaurant')
                isLoggedVar({ state: false, expired: true, message: res && 'La sesión ha expirado', code: 403 })
            }
        }
    }, [data, called])

    useEffect(() => {
        const res = dataLogged?.isLogged
        if (res?.message) {
            // isLoggedVar({ ...isLoggedVar(), message: undefined })
            if (res.code >= 500) console.log(res.message)
            else if (res.code >= 400 && res.code !== 403) console.log(res.message)
            else if (res.code >= 300 || res.code === 403) console.log(res.message)
            else if (res.code >= 200) console.log(res.message)
        }
    }, [dataLogged?.isLogged])

    useEffect(() => {
        updateToken().catch(() => setIsMount(true))
        const dataDevice = getDeviceId()
        window.localStorage.setItem('deviceid', dataDevice)
    }, [location.pathname, updateToken])
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}