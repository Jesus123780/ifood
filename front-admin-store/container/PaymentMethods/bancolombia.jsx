import Text from 'components/common/Text'
import InputHooks from 'components/InputHooks/InputHooks'
import { FlipCard } from 'components/PaymentCard/cards'
import { CreditCard, Line, Number } from 'container/PaymentCard/styled'
import React from 'react'
import { Card, ContentCard } from './styled'

export const Bancolombia = ({ NAME_CARD, handleFocus, flipped, cardNum, numOnCard, setFlipped, handleOnblur, errors, handleChange, handleNumChange, values }) => {
  return (
    <React.Fragment>
      <Text
        align={'center'}
        text={NAME_CARD}
      />
      <ContentCard>
        <Card>
          <div>
            <InputHooks
              name='card'
              onChange={handleNumChange}
              required
              title='number'
              value={cardNum}
              width={'100%'}
            />
            <InputHooks
              error={errors?.ccv}
              name='ccv'
              onBlur={handleOnblur}
              onChange={handleChange}
              onFocus={handleFocus}
              required
              title='CCV'
              value={values?.ccv}
              width={'100%'}
            />
            <InputHooks
              error={errors?.dueDate}
              name='dueDate'
              onBlur={handleOnblur}
              onChange={handleChange}
              onFocus={handleFocus}
              required
              title='dueDate'
              type='month'
              value={values?.dueDate}
              width={'100%'}
            />
          </div>
        </Card>
        <Card>
          <FlipCard
            backChild={
              <CreditCard backChild={true}>
                <Line />
                {NAME_CARD}
                
                {values.ccv}
              </CreditCard>
            }
            flipped={flipped}
            frontChild={
              <CreditCard>
                {NAME_CARD}
                <Number>{numOnCard}</Number>

              </CreditCard>
            }
            onClick={() => { return setFlipped(!flipped) }}
            setFlipped={setFlipped}
          />

        </Card>
      </ContentCard>
    </React.Fragment>
  )
}

Bancolombia.propTypes = {}
