import '../styles/globals.css'
import Context from '../context/Context'
import { Layout } from '../components/Layout'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/apolloClient'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import Auth from '../apollo/Auth'
import 'nprogress/nprogress.css';
import NextNprogress from 'nextjs-progressbar';
import { PColor } from '../public/colors'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  return (
    <Context>
      <ApolloProvider client={apolloClient}>
        <Auth>
          <GlobalStyle />
          <NextNprogress color={PColor  } startPosition={0} stopDelayMs={10} height={5} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      </ApolloProvider >
    </Context>
  )
}
