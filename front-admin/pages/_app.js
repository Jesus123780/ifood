/* eslint-disable @next/next/inline-script-id */
import PropTypes from 'prop-types'
import '../styles/globals.css'
import Context from '../context/Context'
import { Layout as MainLayout } from '../components/Layout'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/apolloClient'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import Auth from '../apollo/Auth'
import { ProgressBar } from '../components/common/Nprogres'
import 'swiper/css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  const Layout = Component.Layout ? Component.Layout : MainLayout
  const router = useRouter()
  const [animating, setIsAnimating] = useState(false)
  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true)
    }
    const handleStop = () => {
      setIsAnimating(false)
    }
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  console.log(animating)
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
          <ProgressBar final={100} progress={99}/>
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

export const EmptyLayout = ({ children }) => { return <div>{children}</div> }

EmptyLayout.propTypes = {
  children: PropTypes.node
}
