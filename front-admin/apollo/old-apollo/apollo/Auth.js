import React, { useEffect, useState, Fragment, useContext } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { isLoggedVar } from './cache'
import { UPDATE_TOKEN } from './queries'
import { useRouter } from 'next/router'
import { getDeviceId } from './apolloClient'
import { Context } from 'context/Context'
import { getToken } from 'utils'
import { useUser } from 'components/hooks/useUser'

export default ({ children }) => {
    const [updateToken, { data, called, error: e }] = useMutation(UPDATE_TOKEN)
    const [isMount, setIsMount] = useState(false)
    const location = useRouter()
    const { setAlertBox, setSessionActive, isSession } = useContext(Context)

    // Actualiza el auth token del usuario por cada cambio de ventana
    const { data: dataLogged, called: call, error } = useQuery(gql`
        query IsUserLoggedIn {
            isLogged @client
        }`, { errorPolicy: 'all' }
    )

    const [dataUser, { loading: loUser }] = useUser()
    useEffect(() => {
        const token = window.localStorage.getItem('session')
        const id = window.localStorage.getItem('usuario')
        let error = token ? false : true
        if (token) {
            isLoggedVar({ state: true, expired: false })
        }
        updateToken({
            variables: {
                token: token,
                error,
                id
            }
        }).then((x) => {
            if (x.data.refreshUserPayrollToken.success === true) {
                isLoggedVar({ state: false, expired: true, message: res && 'La sesión ha expirado', code: 403 })
            }
        }).catch(() => setIsMount(true))
    }, [])

    // useEffect(() => {
    //     const { state, expired } = dataLogged?.isLogged || {}
    //     if (state) setSessionActive(state)
    // }, [dataLogged, call, data])

    // Respuesta de la verificación del token
    useEffect(() => {
        const res = data?.refreshUserPayrollToken
        // if (called && res, dataLogged) {
        //     setIsMount(true)
        //     console.log(res)
        //     if (res.restaurant) {
        //         localStorage.setItem('restaurant', res.restaurant)
        //         isLoggedVar({ state: true, expired: false })
        //     } else {
        //         // localStorage.clear()
        //         const res = localStorage.getItem('restaurant')
        //         isLoggedVar({ state: false, expired: true, message: res && 'La sesión ha expirado', code: 403 })
        //     }
        // }
    }, [data, called, dataLogged])

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