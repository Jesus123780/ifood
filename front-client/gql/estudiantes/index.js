import { gql } from '@apollo/client';

export const GET_COURSES = gql`
    query getCourses {
      courses{
          cId
          title
          description
          topic
    }
  }  
`