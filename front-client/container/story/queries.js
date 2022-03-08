import { gql } from '@apollo/client'

export const GET_ALL_STORY = gql`
query getAllStoryStore($idStore: ID) {
  getAllStoryStore(idStore: $idStore) {
    idStore
    stoId
    iStoId
    sState
    nameStore
    createAt  
    updateAt
  }
}
`
export const GET_ALL_STORY_IMAGE_ITEM = gql`
query getAllStoryItemPhotoStore($idStore: ID, $stoId: ID) {
  getAllStoryItemPhotoStore(idStore: $idStore, stoId: $stoId) {
    idStore
    iStoId
    stoId
    itemImage
    createAt
    updateAt
  }
}
`