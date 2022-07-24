/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, Fragment } from 'react'
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client'
import { isLoggedVar } from './cache'
import { UPDATE_TOKEN } from './queries'
import { useRouter } from 'next/router'
import { getUserFromToken } from '~/utils'
import { getSession } from '~/hooks/useSession'

export default function Auth({ children }) {
  // STATE
  const { client } = useApolloClient()
  const location = useRouter()
  
  // QUERIES
  const [updateToken, { data, called }] = useMutation(UPDATE_TOKEN)

  // Actualiza el auth token del usuario por cada cambio de ventana
  const QUERY_DATA_LOGGING = gql`
  query IsUserLoggedIn {
      isLogged @client
  }`
  const { data: dataLogged } = useQuery(QUERY_DATA_LOGGING)
  // Verifica el token
  useEffect(() => {
    updateToken().catch(() => { return })

  }, [updateToken])
  // Respuesta de la verificación del token
  useEffect(() => {
    const fetchData = async () => {
      const { token, isSession } = await getSession()
      const { error } = await getUserFromToken(token)
      if (isSession && error) {
        await window
          .fetch(`${process.env.URL_BASE}api/auth/logout/`, {})
          .then(response => {
            if (response) {
              client?.clearStore()
              location.replace('/entrar')
              // window.localStorage.clear()
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
  }, [data, called, client, location])

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
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}