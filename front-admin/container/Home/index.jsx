import Context from 'context/Context'
import React, { useContext } from 'react'
import Image from 'next/image'
import { Container, ContainerLeft, ContentImage, Form } from './styled'
import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from 'components/Ripple'
import { useFormTools } from 'components/BaseForm'
import { useRouter } from 'next/router'

export const Home = () => {
  const [handleChange, handleSubmitMain, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const router = useRouter()

  return (
    <Container>
      <ContainerLeft>
        <ContentImage>
          <Image
            alt={'Picture of the author'}
            blurDataURL='/images/sign-in_3f701ac0c6.png'
            layout='fill'
            objectFit='cover'
            placeholder='blur'
            src={'/images/sign-in_3f701ac0c6.png'}
          />
        </ContentImage>
      </ContainerLeft>
      <Form onSubmit={(e) => {return console.log(e)}}>
        <InputHooks
          error={errorForm?.correo}
          name='correo'
          onChange={handleChange}
          required
          title='Correo'
          value={dataForm?.correo}
          width='100%'
        />
        <InputHooks
          error={errorForm?.pass}
          name='pass'
          onChange={handleChange}
          required
          title='pass'
          value={dataForm?.pass}
          width='100%'
        />
        <RippleButton
          margin='20px auto'
          onClick={(e) => { router.push('/entrar'), e.stopPropagation() }}
          widthButton='100%'
        >Login</RippleButton>
        {/* <RippleButton widthButton='100%' margin='20px auto' onClick={() => console.log()}>Login</RippleButton> */}
      </Form> 
    </Container>
  )
}
