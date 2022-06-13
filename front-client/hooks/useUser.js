import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/index'
import { GET_USER } from '../../gql/LoginAut'

export const useUser = () => {
  const router = useRouter()
   const { setAlertBox } = useContext(Context)
  const { data, loading, error } = useQuery(GET_USER, {
    onCompleted: () => {
      const dataUser = data?.getUser
    },
    onError: (err) => {
      if (err) {
        // router.replace('/')
        // setAlertBox({ message: `Su session a terminado`, duration: 8000 })

      }
    }
  })
  return [data?.getUser, { loading, error }]
}