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
                        objectFit='cover'
                        layout='fill'
                        src={'/images/sign-in_3f701ac0c6.png'}
                        alt={"Picture of the author"}
                        blurDataURL="/images/sign-in_3f701ac0c6.png"
                        placeholder="blur"
                    />
                </ContentImage>
            </ContainerLeft>
            <Form onSubmit={(e) => console.log(e)}>
                <InputHooks title='Correo' width='100%' required error={errorForm?.correo} value={dataForm?.correo} onChange={handleChange} name='correo' />
                <InputHooks title='pass' width='100%' required error={errorForm?.pass} value={dataForm?.pass} onChange={handleChange} name='pass' />
                <RippleButton widthButton='100%' margin='20px auto' onClick={(e) => { router.push('/entrar'), e.stopPropagation(); }}>Login</RippleButton>
                {/* <RippleButton widthButton='100%' margin='20px auto' onClick={() => console.log()}>Login</RippleButton> */}
            </Form> 
        </Container>
    )
}
