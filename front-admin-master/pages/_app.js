import { ApolloProvider } from '@apollo/client'
import { Layout } from 'components/layout'
import Context from 'context/Context'
import { GlobalStyle } from 'public/styles/GlobalStyle'
import { useApollo } from '../apollo/apolloClient'
import '../styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <Context>
      <ApolloProvider client={apolloClient}>
      <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Context>
  )
}

export default MyApp
