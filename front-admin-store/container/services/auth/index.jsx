import React, { useContext, useState } from 'react'
import Column from '~/components/common/Atoms/Column'
import Text from '~/components/common/Atoms/Text'
import { RippleButton } from '~/components/Ripple'
import { Context } from '~/context/Context'
import { useDynamicAuth } from '~/hooks/useDynamicAuth'
import Option from './Option'
import { ContainerAuth, Content, TableKeyboard } from './styles'
import PropTypes from 'prop-types'
import { Loading } from '~/components/Loading'
import { PColor } from '@/public/colors'
import NotFount from '~/container/404'

// eslint-disable-next-line
const AuthPassthrough = ({ idStore, user }) => {
  // STATE
  const [options] = useState([
    ['1'],
    ['2'],
    ['3'],
    ['4'],
    ['5'],
    ['6'],
    ['7'],
    ['8'],
    ['9'],
    ['0']
  ])
  const { setAlertBox } = useContext(Context)
  // QUERY
  const [pass, { loading, error }] = useDynamicAuth()
  console.log('🚀 ~ file: index.jsx ~ line 29 ~ AuthPassthrough ~ pass', pass)
  // HANDLESS

  const [password, setPassword] = useState([])

  const addChar = (e) => {
    if (password.length < 4) {
      setPassword([...password, e])
    }
  }
  /**
 * This function simulate the API call and password
 * check logic.
 *
 */
  const MOCK_PASSWORD = '1234'

  const checkPassword = IncomingPass => {
    const userPassword = MOCK_PASSWORD.split('')
    let isValid = false
    userPassword.forEach((char, i) => {
      const number = parseInt(char)
      const IncomingPassword = parseInt(IncomingPass[i][0][0][0])
      const position = IncomingPassword

      if (number === position) {
        isValid = true
      }
    })

    return isValid
  }

  const erase = () => { return setPassword(password.filter((_, i) => { return i + 1 !== password.length })) }

  const validatePassword = accessor => { return accessor.length === 4 }

  const handleSubmit = () => {
    const length = validatePassword(password)
    if (length) {
      const isValid = checkPassword(password)
      if (isValid) {
        setPassword([])
      } else setAlertBox({ message: '¡Acceso al sistema denegado! contraseña incorrecta', duration: 90000 })
    } else {
      setAlertBox({ message: 'La contraseña debe ser de 4 dígitos', duration: 90000 })
    }
  }
  if (error) {
    return <NotFount errorType='500' />
  }
  return (
    <Content>
      {loading && <Loading />}
      <ContainerAuth>
        <Text
          as='h2'
          margin={'30px 0'}
          textAlign={'center'}
        >
          Ahora solo necesitas ingresar tu contraseña	
        </Text>
        <Column>
          <Column className='pass-md' height='40px'>
            <Text textAlign={'center'}>
              {password?.map((_, i) => {
                return (
                  <Text
                    className='password'
                    fontSize='20px'
                    key={i}
                    margin={'0 10px'}
                    textAlign={'center'}
                  ></Text>
                )
              })}
            </Text>
          </Column>
          <TableKeyboard className='App_card_options'>
            {options?.map((values, i) => {
              return (
                <Option
                  key={i}
                  onClick={() => { return addChar(values) }}
                  values={values}
                />
              )
            })}

            <Option isBackspace onClick={() => { return erase() }} />
          </TableKeyboard>
          <RippleButton
            bgColor='transparent'
            border={`1px solid ${PColor}`}
            color={PColor}
            height='35px'
            margin={'10px 0'}
            onClick={() => { return handleSubmit() }}
            padding='0'
            radius='60px'
          >
            Cancelar
          </RippleButton>
          <RippleButton
            bgColor='transparent'
            border={`1px solid ${PColor}`}
            color={PColor}
            height='35px'
            onClick={() => { return handleSubmit() }}
            padding='0'
            radius='60px'
          >
            Entrar
          </RippleButton>
        </Column>
      </ContainerAuth>
    </Content>
  )
}

AuthPassthrough.propTypes = {
  idStore: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default AuthPassthrough