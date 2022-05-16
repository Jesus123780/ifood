import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { Bancolombia, BancoDeBogota, Nequi } from 'container/PaymentMethods'
import { REGISTER_PAYMENT_CARD_STORE } from 'container/PaymentMethods/queries'
import { useMutation } from '@apollo/client'
import { Context } from 'context/Context'
import { getCardType } from 'utils'
import { useUser } from 'components/hooks/useUser'
import { RippleButton } from 'components/Ripple'

export default function PaymentMethods() {
  const router = useRouter()
  const { query } = router || {}
  const { slug } = query || {}
  const { setAlertBox } = useContext(Context)
  const [flipped, setFlipped] = useState(false)
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [cardNum, setCardNum] = useState('')
  const [numOnCard, setNumOnCard] = useState('#### #### #### ####')
  const [cardType, setCardType] = useState('VISA')

  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  const [data] = useUser()
  const handleFocus = () => {
    setFlipped(!flipped)
  }
  const handleOnblur = () => {
    setFlipped(!flipped)
  }
  const cardLogo = {
    VISA: 'visa',
    AMEX: 'amex',
    MASTERCARD: 'master',
    DISCOVER: 'discover'
  }
  const handleNumChange = (e) => {
    let value = e.target.value
    const userRemovingNum = value.length < cardNum.length

    if (
      (isNaN(value.split(' ').join('')) && value !== '') ||
      e.nativeEvent.data === ' '
    ) {
      //User entered an alphabet
      return
    }
    if (userRemovingNum) {
      setCardNum(value)

      let num = numOnCard
      const arr = num.split('')
      if (arr[value.length] != ' ') {
        arr.splice(value.length, 1, '#')
      }
      num = arr.join('')
      setNumOnCard(num)
      if (!value.length) {
        setNumOnCard('#### #### #### ####')
        setCardType('VISA')
      }
      return
    }

    if (value.split(' ').join('').length == 6) {
      //Get the card type
      const type = getCardType(value.split(' ').join(''))
      setCardType(type)
    }
    if (cardType == 'AMEX' && value.length <= 17) {
      let num
      if (value.length >= 8 && value.length <= 14) {
        if (value.length == 8) {
          num = numOnCard.slice(0, value.length - 1) + '*' + '### #####'
        } else {
          num =
            numOnCard.slice(0, value.length - 1) +
            '*' +
            numOnCard.slice(value.length)
        }
      } else {
        num = numOnCard.split('')
        num.splice(value.length - 1, 1, value[value.length - 1])
        num = num.join('')
      }
      setNumOnCard(num)

      if (value.length == 11) {
        value = value + ' '
      }
      setCardNum(value)
    } else if (cardType != 'AMEX' && value.length <= 19) {
      let num
      if (value.length <= 4) {
        num = value + numOnCard.slice(value.length)
      } else if (value.length >= 6 && value.length <= 15) {
        num =
          numOnCard.slice(0, value.length - 1) +
          '*' +
          numOnCard.slice(value.length)
      } else {
        num = numOnCard.split('')
        num.splice(value.length - 1, 1, value[value.length - 1])
        num = num.join('')
      }
      setNumOnCard(num)

      if (value.length == 4) {
        value = value + ' '
      } else if (value.length == 9) {
        value = value + ' '
      } else if (value.length == 14) {
        value = value + ' '
      }
      setCardNum(value)
    }
  }
  const [registerPaymentCard] = useMutation(REGISTER_PAYMENT_CARD_STORE)
  const handleSubmit = () => {
    const { ccv, dueDate } = values || {}
    registerPaymentCard({
      variables: {
        input: {
          typeCardName: slug && slug[0],
          numberCard: parseInt(cardNum) || 0,
          CVV: parseInt(ccv),
          dueDate: dueDate,
          clientName: data?.email || ''
        }
      }
    }).then(() => {
      setAlertBox({ message: '' })
    }).catch(() => {
      setAlertBox({ message: '' })
    })
  }
  const rutes = {
    BANCOLOMBIA: <Bancolombia
      NAME_CARD={slug && slug[0]}
      cardLogo={cardLogo}
      cardType={cardType}
      errors={errors}
      flipped={flipped}
      handleChange={handleChange}
      handleFocus={handleFocus}
      handleNumChange={handleNumChange}
      handleOnblur={handleOnblur}
      handleSubmit={handleSubmit}
      numOnCard={numOnCard}
      setCardNum={setCardNum}
      setErrors={setErrors}
      setFlipped={setFlipped}
      setNumOnCard={setNumOnCard}
      values={values}
    />,
    NEQUI: <Nequi
      NAME_CARD={slug && slug[0]}
      cardLogo={cardLogo}
      handleChange={handleChange}
      handleFocus={handleFocus}
      handleNumChange={handleNumChange}
      handleOnblur={handleOnblur}
      handleSubmit={handleSubmit}
    />,
    BANCO_DE_BOGOTA: <BancoDeBogota
      NAME_CARD={slug && slug[0]}
      cardLogo={cardLogo}
      handleChange={handleChange}
      handleFocus={handleFocus}
      handleNumChange={handleNumChange}
      handleOnblur={handleOnblur}
      handleSubmit={handleSubmit}
    />
  }
  return (<React.Fragment>
    {rutes[slug]}
    <RippleButton onClick={() => { return handleSubmit() }} widthButton={'100%'}>button</RippleButton>
  </React.Fragment>)
}