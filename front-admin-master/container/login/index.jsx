import { URL_BASE } from 'apollo/urls';
import React from 'react'
import fetchJson from '../../components/hooks/fetchJson'
import { useRouter } from 'next/router'
import { Container, ContainerLeft, ContentImage, Form } from './styled';
import Image from 'next/image'
import { useFormTools } from 'components/BaseForm';
import InputHooks from 'components/InputHooks/InputHooks';
import { RippleButton } from 'components/Ripple';

export const Login = (props) => {
    // STATES
    const [handleChange, handleSubmitMain, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const fileInputRef = React.useRef(null);
    const formRef = React.useRef(null);
    const router = useRouter()
    // HANDLES
    const onClickHandler = () => {
        fileInputRef.current?.click();
    };
    const onChangeHandler = (event) => {
        if (!event.target.files?.length) {
            return;
        }
        const formData = new FormData();

        Array.from(event.target.files).forEach((file) => {
            formData.append(event.target.name, file);
        });

        props.onChange(formData);

        formRef.current?.reset();
    };
    const body = {
        name: 'juvinaojesusd@gmail.com',
        username: 'juvinaojesusd@gmail.com',
        lastName: 'juvinaojesusd@gmail.com',
        email: 'juvinaojesusd@gmail.com',
        password: '113561675852804771364',
        locationFormat: ' locationFormat[0]?.formatted_address',
        useragent: 'window.navigator.userAgent',
        deviceid: '23423423432',
    }
    const handleSubmit = () => {
        return fetchJson(`${URL_BASE}auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(res => {
            console.log(res.success)
            console.log(res.success)
            if (res.success === true) {
                window.localStorage.setItem('restaurant', res?.idStore)
                router.push('/dashboard')
            }
        }).catch(e => {
        })
    }
    const handleForm = (e) => handleSubmitMain({
        event: e,
        action: () => {
            return fetchJson(`${URL_BASE}auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(res => {
                if (res.success === true) {
                    window.localStorage.setItem('restaurant', res?.idStore)
                    router.push('/dashboard')
                }
            }).catch(e => {
            })
        }
    })
    return (
        <div>
            {/* <form ref={formRef}>
                <button type="button" onClick={onClickHandler}>
                    {props.label}
                </button>
                <input
                    accept={props.acceptedFileTypes}
                    multiple={props.allowMultipleFiles}
                    name={props.uploadFileName}
                    onChange={onChangeHandler}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    type="file"
                />
            </form> */}
            <Container>
                <ContainerLeft>
                    <ContentImage>
                        <Image
                            width={1000}
                            objectFit='cover'
                            height={1500}
                            layout='fill'
                            src={'/images/sign-in_3f701ac0c6.png'}
                            alt={"Picture of the author"}
                            blurDataURL="/images/sign-in_3f701ac0c6.png"
                            placeholder="blur"
                        />
                    </ContentImage>
                </ContainerLeft>
                <Form onSubmit={(e) => handleForm(e)}>
                    <InputHooks title='Correo' width='100%' required error={errorForm?.correo} value={dataForm?.correo} onChange={handleChange} name='correo' />
                    <InputHooks title='pass' width='100%' required error={errorForm?.pass} value={dataForm?.pass} onChange={handleChange} name='pass' />
                    <RippleButton widthButton='100%' margin='20px auto' onClick={() => handleSubmit()}>Login</RippleButton>
                </Form>
            </Container>
        </div>
    )
}
