import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { GET_ALL_CATEGORIES } from '../../container/Update/Categories/queries'
import { Context } from '../../Context'
import { GET_USER } from '../../gql/LoginAut'

export const useUser = () => {
    const router = useRouter()
    const { data, loading, error } = useQuery(GET_USER, {
      onCompleted: () => {
          const dataUser = data?.getUser
      },
      onError: (err) => console.log({ message: `${err}`, duration: 8000 })
    })
    return [data?.getUser, { loading, error }]
  }