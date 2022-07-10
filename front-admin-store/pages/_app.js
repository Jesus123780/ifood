/* eslint-disable no-console */
import PropTypes from 'prop-types'
import Context from '../context/Context'
import Head from 'next/head'
import { Layout as MainLayout } from '../components/Layout'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/apolloClient'
import Auth from '../apollo/Auth'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import { ProgressBar } from '../components/common/Nprogres'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Noscript from 'components/Noscript'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../styles/globals.css'
// where: { u_id: deCode(u_id), ua_date: { [Op.startsWith]: ua_date } }
export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  const router = useRouter()
  const [animating, setIsAnimating] = useState(false)
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => {return <MainLayout>{page}</MainLayout>})
  useEffect(() => {
    const handleStop = () => {
      setIsAnimating(false)
    }
    router.events.on('routeChangeStart', () => {
      setIsAnimating(true)
    })
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', () => {
        setIsAnimating(true)
      })
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // checkValidServiceWorker('http://localhost:3001/app/sw.js')
      window.addEventListener('load', function (config) {
        // checkValidServiceWorker()
        navigator.serviceWorker.register('/app/sw.js')
          .then((registration) => {
            console.log(registration)
            console.log('Service Worker registration successful with scope: ', registration.scope)
            registration.onupdatefound = () => {
              const installingWorker = registration.installing
              if (installingWorker === null) {
                return
              }
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // At this point, the updated precached content has been fetched,
                    // but the previous service worker will still serve the older
                    // content until all client tabs are closed.
                    console.log(
                      'New content is available and will be used when all ' +
                      'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                    )

                    // Execute callback
                    if (config && config.onUpdate) {
                      config.onUpdate(registration)
                    }
                  } else {
                    // At this point, everything has been precached.
                    // It's the perfect time to display a
                    // "Content is cached for offline use." message.
                    console.log('Content is cached for offline use.')

                    // Execute callback
                    if (config && config.onSuccess) {
                      config.onSuccess(registration)
                    }
                  }
                }
              }
            }
          },
            function (err) {
              console.log('Service Worker registration failed: ', err)
            }
          )
      })
    }
    setShowChild(true)
  }, [])
  if (!showChild) {
    return null
  }
  if (typeof window === 'undefined') {
    return <div>Loading...</div>
  }

  return (
    <Context>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
        strategy='beforeInteractive'
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', 'GTM-59SFH7N');
          `
        }}
        id='afterInteractive'
        strategy='afterInteractive'
      />
      <ApolloProvider client={apolloClient}>
        <Auth>
          <GlobalStyle />
          {<ProgressBar progress={animating} />}
          <Noscript>
          </Noscript>
            <Head>
              <link rel="manifest" href="/manifest.json" />
              <meta name="mobile-web-app-capable" content="yes" />
              <meta name="theme-color" content="#0b6580" />
              <meta name="msapplication-starturl" content="/" />
              <meta name="apple-mobile-web-app-capable" content="yes" />
              <meta name="apple-mobile-web-app-status-bar-style" content="black" />
              <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
              <link rel="icon" href="/favicon.ico" type="image/x-icon" />
              <link rel="apple-touch-icon" sizes="192x192" href="logo-apple.png" />
            </Head>
            {getLayout(<Component {...{ ...pageProps, isMobile: false }} />)}
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
