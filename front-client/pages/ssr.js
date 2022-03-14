import { gql, ApolloClient, InMemoryCache } from '@apollo/client'
import { URL_BASE } from '../apollo/urls'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import ws from 'ws';
const SSR = ({ items }) => {
  console.log(items)
  return (
    <div>{items}</div>
  )
}
const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {
  options: {
    reconnect: true,
  },
}, ws)



const client = new ApolloClient({
  wsClient,
  // networkInterface: networkInterfaceWithSubscriptions,
  uri: `http://localhost:4000/graphql`,
  cache: new InMemoryCache(),
})
export const getServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query getMessage {
        getMessage
      }
    `,
    mutation: gql`
    subscription {
     numberIncremented
  }
    `
  })
  const items = data.getMessage
  return { props: { items } }
}

export default SSR
