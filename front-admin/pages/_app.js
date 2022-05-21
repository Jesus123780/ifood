/* eslint-disable @next/next/inline-script-id */
import PropTypes from 'prop-types'
import '../styles/globals.css'
import Context from '../context/Context'
import { Layout as MainLayout } from '../components/Layout'
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
import Script from 'next/script'
export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  const Layout = Component.Layout ? Component.Layout : MainLayout
  return (
    <Context>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', 'GTM-TSJPRBR');
        `
        }}
        strategy='afterInteractive'
      />
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

export const EmptyLayout = ({ children }) => {return <div>{children}</div>}

EmptyLayout.propTypes = {
  children: PropTypes.node
}
