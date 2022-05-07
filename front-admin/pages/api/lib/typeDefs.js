import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

const typesArray = loadFilesSync('**/*.gql')

// eslint-disable-next-line no-undef
module.exports = mergeTypeDefs(typesArray)
