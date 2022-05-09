import { GraphQLScalarType } from 'graphql'

const dateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  serialize (value) {
    return value.getTime() // Convert outgoing Date to integer for JSON
  },
  parseValue (value) {
    return new Date(value) // Convert incoming integer to Date
  }
})

export default {
  dateTimeScalar
}
