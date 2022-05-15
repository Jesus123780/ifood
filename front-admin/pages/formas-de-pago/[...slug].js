import React from 'react'
import { useRouter } from 'next/router'
import { Bancolombia, BancoDeBogota, Nequi } from 'container/PaymentMethods'

export default function PaymentMethods() {
  const router = useRouter()
  const { query } = router || {}
  const { slug } = query || {}
  const rutes = {
    BANCOLOMBIA: <Bancolombia />,
    NEQUI: <Nequi />,
    'BANCO_DE_BOGOTA': <BancoDeBogota />
  }
  return (<React.Fragment>{rutes[slug]}</React.Fragment>)
}