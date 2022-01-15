import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
query getMessages($from: String!) {
  getMessages(from: $from) {
    uuid
    content
    from
    to
  }

}
`
export const SEND_MESSAGES = gql`
mutation sendMessage($to: String!, $content: String!) {
  sendMessage(to: $to, content: $content) {
    uuid
    content
    from
    to
  }

}
`
export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid
      from
      to
      content
      createdAt
    }
  }
`