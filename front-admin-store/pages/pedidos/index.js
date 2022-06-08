// import { RegisterUser } from "../../container/user";
import { withIronSessionSsr } from 'iron-session/next'

import PedidosStore from 'container/PedidosStore'
import { cookie, defaultReturnObject } from 'utils'
import React from 'react'

export default function PedidosStoreView () {
  return (
    <React.Fragment>
      <PedidosStore />
    </React.Fragment>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req }) {
    const { user } = req.session || {}
    const { storeUserId } = user || {}
    const { idStore } = storeUserId || {}
    try {
      if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
      return {
        props: {
          user: user,
          idStore
        }
      }
    } catch (error) {
      return {}
    }
  },
  cookie
)
