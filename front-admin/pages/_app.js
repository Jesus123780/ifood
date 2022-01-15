import '../styles/globals.css'
import Context from '../context'
import { useState } from 'react'
import { Layout } from '../components/Layout'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/apolloClient'
import { GlobalStyle } from '../public/styles/GlobalStyle'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  return (
    <Context>
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider >
    </Context>
  )
}
