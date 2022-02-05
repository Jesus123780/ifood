import '../styles/globals.css'
import Context from '../context'
import { useState } from 'react'
import { Layout } from '../components/Layout'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/apolloClient'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import { useTheme } from '../components/hooks/useTheme'
import { ThemeProvider } from 'styled-components'
import Auth from '../apollo/Auth'
export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  return (
    <Context>
      <ApolloProvider client={apolloClient}>
        <Auth>
          {/* <ThemeProvider theme={theme}> */}
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {/* </ThemeProvider> */}
        </Auth>
      </ApolloProvider >
    </Context>
  )
}
