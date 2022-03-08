import { useQuery } from '@apollo/client'
import { PaymentCard } from 'container/payment'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function PayView() {
  return (
    <div >
      <Head>
        <title>Delibery de Historia </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PaymentCard 
      />
    </div>
  )
}
