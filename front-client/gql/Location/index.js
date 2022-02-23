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
export const GET_ONE_COUNTRY= gql`
query getOneCountry($cId: ID){
  getOneCountry(cId: $cId) {
    cId
    cName
    cName
    cDatCre
    cCalCod
    cState
    cDatMod
    
  }
}
`
export const GET_ONE_DEPARTMENT= gql`
query getOneDepartment($dId: ID){
    getOneDepartment(dId: $dId) {
    dId
    cId
    dName
    dState
    dDatCre
    dDatMod
  }
}
`
export const GET_ONE_CITY= gql`
query getOneCities($ctId: ID){
    getOneCities(ctId: $ctId) {
        ctId
        dId
        cName
        cState
        cDatCre
        cDatMod
  }
}
`