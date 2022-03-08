import { gql } from '@apollo/client';

export const CREATE_STORE = gql`
    mutation registerStoryStore($input: IStoryStore) {
  registerStoryStore(input: $input) {
    id
    idStore
    iStoId
    sState
    nameStore
    createAt
    updateAt
  }
}
`
export const CREATE_STORE_ITEM_IMAGE = gql`
mutation registerStoryItemPhotoStore($input: IStoryItemPhotoStore) {
  registerStoryItemPhotoStore(input: $input) {
    idStore
    iStoId
    stoId
    itemImage
    createAt
    updateAt
  }
}
`