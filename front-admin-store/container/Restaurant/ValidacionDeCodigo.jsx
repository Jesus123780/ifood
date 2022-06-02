import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useFormTools } from '../../components/BaseForm'
import InputHooks from '../../components/InputHooks/InputHooks'
import OTPInput from '../../components/OTPInputHook'
import { RippleButton } from '../../components/Ripple'
import { EColor } from '../../public/colors'
import { Cards, ContentCards, Text } from './styled'

const CodeValidation = props => {
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const [step, setStep] = useState(0)
  const router = useRouter()
  const nextPage = () => {
    if (step === 1) {
      router.push('/restaurante/planes')
    } else {
      setStep(1)
    }
  }
  return (
    <div>
      <ContentCards>
        <h1>Confirma tu correo electrónico</h1>
        <Text margin='30px 0' size='14px'>Introduce el código de validación enviado al correo electrónico:</Text>
        {step === 1 ?
          <div>
            <OTPInput
              autoFocus
              className='otpContainer'
              inputClassName='otpInput'
              isNumberInput
              length={6}
              onChangeOTP={(otp) => {return console.log('String OTP: ', otp)}}
            />
            <Text
              align='center'
              color={EColor}
              margin='30px 0'
              size='14px'
            >Introduce el código de validación enviado al correo electrónico:</Text>
          </div>
          :
          <InputHooks
            error={errorForm?.email}
            name='email'
            onChange={handleChange}
            required
            title='Informa tu correo.'
            value={dataForm?.email}
            width='100%'
          />
        }
        <RippleButton
          bgColor={EColor}
          margin='20px auto'
          onClick={() => {return nextPage()}}
          type='submit'
          widthButton='100%'
        >{step !== 1 ? 'Continuar' : 'Enviar'}</RippleButton>
      </ContentCards>
    </div>
  )
}

CodeValidation.propTypes = {

}

export default CodeValidation
