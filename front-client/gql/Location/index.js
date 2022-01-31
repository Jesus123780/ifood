import { gql } from '@apollo/client'

export const GET_ALL_COUNTRIES = gql`
    query countries {
        countries {
            cId
            cName
            cCalCod
            cState
        }
    }
`
export const GET_ALL_DEPARTMENTS = gql`
    query getAllDeparments($cId: ID!) {
        departments(cId: $cId) {
            dId
                cId
                dName
                dState
            }
    }
`
export const GET_ALL_CITIES = gql`
    query getAllCities($dId: ID!) {
        cities(dId: $dId) {
            ctId
            dId
            cName
            cState
        }
    }
`
export const GET_ALL_ROAD = gql`
query getTypeRoad{
  road{
    rId
    rName
    rState
    rDatCre
    rDatMod
  }
}
`