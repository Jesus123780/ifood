import Column from 'components/common/Atoms/Column'
import Text from 'components/common/Atoms/Text'
import Portal from 'components/portal'
import { RippleButton } from 'components/Ripple'
import { useRouter } from 'next/router'
import { BGColor, PColor, SECColor } from 'public/colors'
import React from 'react'

const NotFount = ({
  error = '¡Algo salió mal! Parece que la página que buscas ya no está disponible',
  errorType = '404',
  redirect = '/dashboard'
}) => {
  const router = useRouter()
  return (
    <Portal selector='portal'>
      <Column
        position='fixed'
        top='0'
        left='0'
        right='0'
        background={BGColor}
        bottom='0'
        zIndex='9999'
        display='grid'
        gridTemplateColumns='450px auto'
        gridGap='40px'
        padding='0 0 0 70px'
        height='100vh'
        placeContent='center'
      >
        <Column display='grid'>
          <Text fontSize='3.375rem' color={SECColor} fontWeight='bold'>Ups...</Text>
          <Text color={SECColor} family='PFont-Light' fontSize='1.625rem' margin='40px 0 40px 0'>{error}</Text>
          <RippleButton color={BGColor} onClick={() => router.push(redirect)}>Regresar para el inicio</RippleButton>
        </Column>
        <Column>
          <Text color={PColor} fontSize='10.78em'>{errorType}</Text>
        </Column>
      </Column>
    </Portal>
  )
}

NotFount.propTypes = {}

export default NotFount