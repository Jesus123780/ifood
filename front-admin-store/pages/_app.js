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
import Noscript from 'components/Noscript'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  const Layout = Component.Layout ? Component.Layout : MainLayout
  const router = useRouter()
  const [animating, setIsAnimating] = useState(false)
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
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/app/sw.js")
          .then((registration) => {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
            function (err) {
              console.log("Service Worker registration failed: ", err);
            }
          );
      });
    }
    // HIDRATACIÓN ERROR FIX
    setShowChild(true);
  }, []);
  if (!showChild) {
    return null;
  }
  if (typeof window === 'undefined') {
    return <div>Loading...</div>;
  } else {
    return (
      <Context>
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
          strategy='afterInteractive'
        />
        <ApolloProvider client={apolloClient}>
          <Auth>
            <GlobalStyle />
            {<ProgressBar progress={animating} />}
            <Noscript>
            </Noscript>
            <Layout>

              <Component {...pageProps} />
            </Layout>
          </Auth>
        </ApolloProvider >
      </Context>
    )
  }

}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export const EmptyLayout = ({ children }) => { return <div>{children}</div> }

EmptyLayout.propTypes = {
  children: PropTypes.node
}
