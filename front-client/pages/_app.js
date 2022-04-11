import React from 'react'
import { Layout } from '../components/Layout'
import Context from '../context'
import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/apolloClient'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import '../public/styles/App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  return (
    <Context>
      <GlobalStyle />
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Context >
  )
}

export default MyApp
