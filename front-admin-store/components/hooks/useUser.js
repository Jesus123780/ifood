import { useQuery } from '@apollo/client'
import { GET_USER } from '../../gql/LoginAut'

export const useUser = () => {
  const { data, loading, error } = useQuery(GET_USER)
  return [data?.getUser, { loading, error }]
}