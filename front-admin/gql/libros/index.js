import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
    query getBooks {
      books{
      bId
      title
      description
      topicBook
    }
}  
`