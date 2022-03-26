// const { router, get, post, options } = require('microrouter');
// const { ApolloServer, gql } = require('apollo-server-micro');
// // npm install micro microrouter apollo-server-micro graphql
// const typeDefs = gql`
//   type Query {
//     sayHello: String
//   }
// `;

// const resolvers = {
//   Query: {
//     sayHello(parent, args, context) {
//       return 'Hello World!';
//     },
//   },
// };

// const apolloServer = new ApolloServer({ typeDefs, resolvers });
// module.exports = apolloServer.start().then(() => {
//   const graphqlPath = '/data';
//   const graphqlHandler = apolloServer.createHandler({ path: graphqlPath });
//   return router(
//     get('/', (req, res) => 'Welcome!'),
//     post(graphqlPath, graphqlHandler),
//     get(graphqlPath, graphqlHandler),
//   );
// });

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
