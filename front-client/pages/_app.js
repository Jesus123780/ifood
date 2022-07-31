import React from 'react'
import PropTypes from "prop-types"
import { Layout as MainLayout } from '../components/Layout'
import Context from '../context'
import Auth from '../apollo/Auth'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/apolloClient'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import '../public/styles/App.css'
import 'swiper/css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  const Layout = Component.Layout ? Component.Layout : MainLayout

  return (
    <Context>
      <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`} />
      <GlobalStyle />
      <ApolloProvider client={apolloClient}>
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      </ApolloProvider>
    </Context >
  )
}

export default MyApp

export const EmptyLayout = ({ children }) => { return <div>{children}</div> }

EmptyLayout.propTypes = {
  children: PropTypes.node.isRequired
}
