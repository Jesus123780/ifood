import React from 'react'
import { Layout } from '../components/Layout'
import Context from '../context'
import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/apolloClient'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import '../public/styles/App.css'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  return (
    <Context>
      <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`} />
    
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
