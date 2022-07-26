import React, { useEffect, useState } from 'react'
import { generateNumberArray } from 'hooks/useGenerateNumberArray'
import Option from './Option'
import { ContainerAuth, TableKeyboard } from './styles'
import { RippleButton } from '~/components/Ripple'
import Text from '~/components/common/Atoms/Text'
import Column from '~/components/common/Atoms/Column'
import { PColor } from '@/public/colors'

const AuthPassthrough = () => {
  const [options, setOption] = useState([
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
  const [hover, setHover] = useState(true)

  const MOCK_PASSWORD = '1234'

  const checkPassword = pass => {
    const userPassword = MOCK_PASSWORD.split('')
    let isValid = false
    userPassword.forEach((char, i) => {
      const number = parseInt(char)
      const position = pass[i][0][0][0]

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
      } else alert('¡Acceso al sistema denegado! contraseña incorrecta')
    } else {
      alert('La contraseña debe ser de 4 dígitos')
    }
  }
  useEffect(() => {
    const data = generateNumberArray()
    setOption(data)
  }, [])
  return (
    <div>
      <ContainerAuth>
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
          <TableKeyboard
            className='App_card_options'
            onMouseEnter={() => { return setHover(false) }}
            onMouseLeave={() => { return setHover(true) }}
          >
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
            height='50px'
            onClick={() => { return handleSubmit() }}
            radius={'40px'}
            widthButton={'100%'}
          > 
              Entrar
          </RippleButton>
        </Column>
      </ContainerAuth>
    </div>
  )
}

AuthPassthrough.propTypes = {}

export default AuthPassthrough