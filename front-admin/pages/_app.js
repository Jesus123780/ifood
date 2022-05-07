import PropTypes from 'prop-types'
import '../styles/globals.css'
import Context from '../context/Context'
import { Layout } from '../components/Layout'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/apolloClient'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import Auth from '../apollo/Auth'
import 'nprogress/nprogress.css'
import NextNprogress from 'nextjs-progressbar'
import { PColor } from '../public/colors'
import 'swiper/css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  return (
    <Context>
      <ApolloProvider client={apolloClient}>
        <Auth>
          <GlobalStyle />
          <NextNprogress
            color={PColor }
            height={5}
            startPosition={0}
            stopDelayMs={10}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      </ApolloProvider >
    </Context>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}
