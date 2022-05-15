import { FlipCard } from 'components/PaymentCard/cards'
import React from 'react'
import { GET_ALL_CARDS_TYPES } from './queries'
import { CreditCard, Line, Number, WarperCards } from './styled'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

export const PaymentCard = () => {
  const { data } = useQuery(GET_ALL_CARDS_TYPES)
  const router = useRouter()
  return (
    <WarperCards>
      {data?.getAllPaymentCardType?.length > 0 && data?.getAllPaymentCardType?.map((elem) => {
        return (
          <FlipCard
            backChild={
              <CreditCard backChild={true}>
                <Line>

                </Line>
                {elem.typeCardName}
              </CreditCard>
            }
            flipped={false}
            frontChild={
              <CreditCard>
                {elem.typeCardName}
                <Number>{'####-####-####-####'}</Number>
              </CreditCard>
            }
            key={elem.cardtypeId}
            onClick={() => { return router.push(`formas-de-pago/${elem.typeCardName}`)}}
            setFlipped={() => { }}
          />

        )
      })}
    </WarperCards>
  )
}

PaymentCard.propTypes = {}
