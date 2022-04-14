/* eslint-disable react/prop-types */
import React from 'react'
import Head from 'next/head'
import { gql, useLazyQuery, useMutation, useSubscription } from '@apollo/client'
import styles from '../../styles/Home.module.css'
import { Restaurant } from '../../container/restaurantes'
import { useContext, useEffect, useState } from 'react'
import { PromosBanner } from '../../container/restaurantes/PromosBanner'
import { Banner } from '../../container/restaurantes/Banner'
import { Section } from '../../container/restaurantes/styled'
import { ListRestaurant } from '../../container/restaurantes/restaurant'
import withSession from '../../apollo/session'
import { GET_ALL_RESTAURANT } from '../../container/restaurantes/queries'
import { RippleButton } from 'components/Ripple'
import { FavoriteStore } from 'container/favoriteStore'
import { ItMayInterestYou, LastRecommended } from 'container/LastRecomendation'
import { BColor, BGColor, PColor } from 'public/colors'
import styled from 'styled-components'
import { Context } from '../../context'

export default function RestaurantHome({ ID_CATEGORIE, PRODUCT_NAME_COOKIE, ACEPTE_COOKIE }) {
  const { setAlertBox } = useContext(Context)

  const [close, setClose] = useState(ACEPTE_COOKIE)
  const [dataStore, setData] = useState([])
  const [showMore, setShowMore] = useState(100)
  const [getAllStoreInStore, { data: dataListStore, fetchMore }] = useLazyQuery(GET_ALL_RESTAURANT, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: 'cache-first',
    refetchWritePolicy: 'merge',
  })
  useEffect(() => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    dataListStore?.getAllStoreInStore && setData([...dataListStore?.getAllStoreInStore])
    getAllStoreInStore()
  }, [dataStore])
  const UPDATE_COOKIES = gql`
mutation setCookie($name: String, $value: String) {
  setCookie(name: $name, value: $value){
    success
    message
  }
}
  `
  const [setCookie] = useMutation(UPDATE_COOKIES, {
    context: { clientName: "main" }

  })
  const NEW_NOTIFICATION = gql`
  subscription {
  newNotification
  }
  `
  const { data: dataWS } = useSubscription(NEW_NOTIFICATION, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData.newNotification)
    }
  })
  useEffect(() => {
    if (dataWS) {
      setAlertBox({ message: dataWS?.newNotification, duration: 30000  })
    }
  }, [dataWS])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Banner />
      </Section>
      <Section>
        <PromosBanner />
      </Section>
      <Section>
        <Restaurant />
      </Section>
      <Section>
        <ListRestaurant
          data={dataListStore?.getAllStoreInStore || []}
        />
      </Section>
      {<RippleButton
        bgColor={BGColor}
        color={BColor}
        border={`1px solid ${PColor}`}
        onClick={() => {
          setShowMore(showMore + 100)
          // getAllStoreInStore()
          fetchMore({
            variables: { max: showMore, min: 0 },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevResult
              return {
                // getAllStoreInStore: [...prevResult.getAllStoreInStore],
                getAllStoreInStore: [...fetchMoreResult.getAllStoreInStore]

              }
            }
          })
        }}
        widthButton='100%'>Ver más</RippleButton>}
      <FavoriteStore />
      {/* <LastRecommended ID_CATEGORIE={ID_CATEGORIE} /> */}
      <ItMayInterestYou PRODUCT_NAME_COOKIE={PRODUCT_NAME_COOKIE} />
      {!ACEPTE_COOKIE && close !== 'true' && <CookieContainer>
        <div className="cookie-consent-banner-opt-out__message-container">
          <h2 className="cookie-consent-banner-opt-out__header">Este sitio usa cookies</h2>
          <button data-testid="action:understood-button" onClick={() => { setClose('true'); setCookie({ variables: { name: 'Hola', value: 'Mundo' } }) }}>Entendido</button>
          <div className="cookie-consent-banner-opt-out__actions">
          </div>
        </div>
      </CookieContainer>}
    </div>
  )
}

const CookieContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2147483647;
    background-color: rgba(0,0,0,.9);
    color: ${BGColor};
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    padding: 48px 48px 24px;
    .cookie-consent-banner-opt-out__message-container {
        margin-right: 50px;
    max-width: 585px;
    min-width: 200px;
    }
    .cookie-consent-banner-opt-out__header {
        margin: 0 0 12px;
        font-size: 20px;
        font-weight: 600;
        color: ${BGColor};
    }
    .cookie-consent-banner-opt-out__actions {
        align-items: center;
        margin: 0 0 24px;
    }
    button {
    color: ${BGColor}!important;
    border-radius: 6px;
    background-color: #3483fa;
    border: none;
    text-decoration: none;
    font-weight: 600;
    line-height: 1em;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    margin: 0 8px 8px 0;
    padding: 16px 24px;
    font-size: 16px;
    }
`
export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req?.session?.get('user')
  const { RECOMMENDATION_COOKIE, PRODUCT_NAME_COOKIE, ACEPTE_COOKIE } = req.cookies || {}
  if (!user) {
    res.setHeader('location', '/entrar')
    res.statusCode = 302
    res.end()
    return { props: {} }
  }
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }

  return {
    props: {
      ID_CATEGORIE: RECOMMENDATION_COOKIE || null,
      PRODUCT_NAME_COOKIE: PRODUCT_NAME_COOKIE || null,
      ACEPTE_COOKIE: ACEPTE_COOKIE || null,
    }
  }
}
)
