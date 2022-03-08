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
    getAllStoryComment {
        cStoId
        stoId
        from
        comments
        messageState
        createAt
        updateAt
    }
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
export const REGISTER_COMMENT_STORY = gql`
mutation registerStoryComment($input: IStoryComment) {
  registerStoryComment(input: $input) {
    cStoId
    stoId
    from
    comments
    username
    messageState
    createAt
    updateAt
  }
}
`
export const GET_ALL_COMMENT_STORY = gql`
query getAllStoryComment($stoId: ID){
  getAllStoryComment(stoId: $stoId) {
      cStoId
      stoId
      from
      username
      comments
      messageState
      createAt
      updateAt
  }
}
`