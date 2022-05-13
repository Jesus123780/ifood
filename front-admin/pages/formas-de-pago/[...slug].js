import React from 'react'
import { useRouter } from 'next/router'
import { Bancolombia, BancoDeBogota } from 'container/PaymentMethods'

export default function PaymentMethods() {
  const router = useRouter()
  const { query } = router || {}
  const { slug } = query || {}
  const rutes = {
    bancolombia: <Bancolombia />,
    'banco-de-bogota': <BancoDeBogota />
  }
  return (<React.Fragment>{rutes[slug]}</React.Fragment>)
}