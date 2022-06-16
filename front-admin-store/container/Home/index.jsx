import React from 'react'
import Image from 'next/image'
import { Container, ContainerLeft, ContentImage, Form } from './styled'
import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from 'components/Ripple'
import { useFormTools } from 'components/BaseForm'
import { useRouter } from 'next/router'
import { formatDate } from 'utils'
import moment from 'moment'


const index = () => {
  const [handleChange, handleSubmitMain, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const router = useRouter()
  const data = formatDate({ date: moment(new Date) })
  const handleRedirect = e => {
    e.stopPropagation()
    router.push('/entrar')
  }
  return (
    <div>
      <Container>
        <ContainerLeft>
          <ContentImage>
            <Image
              alt={'Picture of the author'}
              blurDataURL='/app/images/sign-in_3f701ac0c6.png'
              layout='fill'
              objectFit='cover'
              placeholder='blur'
              src={'/app/images/sign-in_3f701ac0c6.png'}
            />
          </ContentImage>
        </ContainerLeft>
        <Form onSubmit={(e) => { return console.log(e) }}>
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
            onClick={(e) => handleRedirect(e)}
            widthButton='100%'
          >Login</RippleButton>
          {/* <RippleButton widthButton='100%' margin='20px auto' onClick={() => console.log()}>Login</RippleButton> */}
        </Form>
      </Container>
    </div>
  )
}

index.propTypes = {}

export default index
export const Home = () => {
  const [handleChange, handleSubmitMain, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const router = useRouter()
  const data = formatDate({ date: moment(new Date) })

  return (
    <Container>
      <ContainerLeft>
        <ContentImage>
          <Image
            alt={'Picture of the author'}
            blurDataURL='/app/images/sign-in_3f701ac0c6.png'
            layout='fill'
            objectFit='cover'
            placeholder='blur'
            src={'/app/images/sign-in_3f701ac0c6.png'}
          />
        </ContentImage>
      </ContainerLeft>
      <Form onSubmit={(e) => { return console.log(e) }}>
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
          onClick={(e) => handleRedirect(e)}
          widthButton='100%'
        >Login</RippleButton>
        {/* <RippleButton widthButton='100%' margin='20px auto' onClick={() => console.log()}>Login</RippleButton> */}
      </Form>
    </Container>
  )
}
