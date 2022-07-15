/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, Fragment } from 'react'
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client'
import { isLoggedVar } from './cache'
import { UPDATE_TOKEN } from './queries'
import { useRouter } from 'next/router'
import { getUserFromToken } from '~/utils'

export default function Auth({ children }) {
  const { client } = useApolloClient()
  const [updateToken, { data, called }] = useMutation(UPDATE_TOKEN)
  const location = useRouter()

  // Actualiza el auth token del usuario por cada cambio de ventana
  const { data: dataLogged } = useQuery(gql`
        query IsUserLoggedIn {
            isLogged @client
        }`
  )

  // Verifica el token
  useEffect(() => {
    updateToken().catch(() => { })

  }, [updateToken])
  // const onClickLogout = useCallback(async () => {
  //   await window
  //     .fetch(`${process.env.URL_BASE}api/auth/logout/`, {})
  //     .then(res => {
  //       if (res) {
  //         client?.clearStore()
  //         // window.localStorage.clear()
  //         location.replace('/')
  //       }
  //     })
  //     .catch(() => {
  //       // eslint-disable-next-line no-console
  //       console.log({
  //         message: 'Se ha producido un error.',
  //         duration: 30000,
  //         color: 'error'
  //       })
  //     })

  // }, [client, location])
  // Respuesta de la verificación del token
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('usuario')
      const { error } = await getUserFromToken(token)
      if (error) {
        await window
          .fetch(`${process.env.URL_BASE}api/auth/logout/`, {})
          .then(response => {
            if (response) {
              client?.clearStore()
              // window.localStorage.clear()
              location.replace('/entrar')
            }
          }).catch(() => {
            // eslint-disable-next-line no-console
            console.log({
              message: 'Se ha producido un error.',
              duration: 30000,
              color: 'error'
            })
          })
      }
    }
    fetchData()
    const res = data?.refreshUserPayrollToken
    if (called && res) {
      if (res.restaurant) {
        localStorage.setItem('restaurant', res.restaurant)
        isLoggedVar({ state: true, expired: false })
      } else {
        localStorage.clear()
        const restaurant = localStorage.getItem('restaurant')
        isLoggedVar({ state: false, expired: true, message: restaurant && 'La sesión ha expirado', code: 403 })
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
    updateToken().catch(() => { })
    // const dataDevice = getDeviceId()
    // if (typeof window !== 'undefined') {
    //   window.localStorage.setItem('deviceid', dataDevice)
    // }    
  }, [location.pathname, updateToken])
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}