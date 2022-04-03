import { gql } from '@apollo/client'

export const CREATE_NOTIFICATION = gql`
mutation createOneNotification($message: String) {
  createOneNotification(message: $message)
}
`