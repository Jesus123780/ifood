/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, Fragment, useState, useCallback } from 'react'
import { getUserFromToken } from 'utils'
import { OUR_URL_BASE } from './urls'
import { useApolloClient } from '@apollo/client'

export default function Auth({ children }) {
  const [token, setToken] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { client } = useApolloClient()

  const onClickLogout = useCallback(async () => {
    localStorage.removeItem('location.data')
    localStorage.removeItem('session')
    await window
      .fetch(`${OUR_URL_BASE}auth/logout/`, {})
      .then(res => {
        if (res) {
          client?.clearStore()
          location.replace('/')
        }
      })
      .catch(() => {
        console.log({
          message: 'Se ha producido un error.',
          duration: 30000,
          color: 'error'
        })
      })
  }, [client])

  useEffect(() => {
    const session = window.localStorage.getItem('session')
    setToken(session)
    const expiredSession = getUserFromToken(token)
    setRedirect(expiredSession)
    if (session && expiredSession === true) {
      // onClickLogout()
      console.log('session')
    }
  }, [token])

  console.log(token)
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}
