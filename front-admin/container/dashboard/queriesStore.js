import { gql } from '@apollo/client'

export const CREATE_SCHEDULE_STORE = gql`
mutation setStoreSchedule($input: IsStoreSchedule!){
setStoreSchedule(input: $input){
  	schId
  	id
    idStore
    schDay
    schHoSta
    schHoEnd
}
}
`
export const GET_SCHEDULE_STORE = gql`
 query getStoreSchedules($data: Int, $idStore: ID) {
        getStoreSchedules(schDay: $data, idStore: $idStore){
            schId
            idStore
    				id
            schDay
            schHoSta
            schHoEnd
            schState
        }
    }
`