import { gql } from '@apollo/client'

export const CREATE_ONE_STORE = gql`
mutation  newRegisterStore($input: IStore){
  newRegisterStore(input: $input){
    success
    message
  }
}
`
export const GET_ONE_STORE = gql`
query getStore($id: ID){
 getStore(id: $id ){
cId
id
dId
idStore
ctId
neighborhoodStore
Viaprincipal
catStore
storeOwner
storeName
emailStore
storePhone
socialRaz
Image
banner
documentIdentifier
uPhoNum
ULocation
upLat
upLon
uState
siteWeb
description
secVia
NitStore
typeRegiments
typeContribute
addressStore
createAt
  cateStore {
    catStore
    cName
    cState
    cDatCre
    cDatMod
    csDescription
    
  }
}
}
`