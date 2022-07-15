import React, { useContext, useEffect, useState } from 'react';
import { BGColor, PColor } from '../../public/colors';
import { IconCancel, IconTicker, IconLogo, IconSearch } from '../../public/icons';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GET_USER, GET_USER_PROFILE, SET_USER_PROFILE } from './queries';
import { useMutation, useQuery } from '@apollo/client';
import InputHooks from '../../components/InputHooks/InputHooks';
import styled, { css, keyframes } from 'styled-components';
import { filterKeyObject, validationSubmitHooks } from '../../utils';
import { Context } from '../../context';
import { RippleButton } from '../../components/Ripple';
import { LoadEllipsis } from '../../components/LoadingButton'
import { Loading } from '../../components/Loading';
import { Section, Container, Content, AnimationLeft, AnimationRight, BoxInput, Title, ContainerAnimation, ContainerAnimationTow, Input, LabelInput, Paragraph } from './styled';


export const Profile = () => {
  const { data, loading, error } = useQuery(GET_USER)
  const { data: dataUp } = useQuery(GET_USER_PROFILE)
  const [setUserProfile, { loading: loadUP }] = useMutation(SET_USER_PROFILE, {
    onCompleted: (data) => setAlertBox({ message: 'Datos de usuario cambiados con éxito', color: 'success' })

  })

  const { email } = data?.getUser || {}
  const { getOneUserProfile } = dataUp || {}

  const { setAlertBox } = useContext(Context)
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  // const [UpdateUser, { loading: loadingC }] = useMutation(CHANGE_DATA_USER)
  const [active, setActive] = useState(1)

  const handleClick = index => {
    setActive(index === active ? true : index)
  }
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  const { currentPassword, newPassword } = values
  const handleSavePass = async e => {
    e.preventDefault()
    // Declarando variables
    let errorSubmit = false
    for (const x in errors) {
      if (errors[x]) errorSubmit = true
    }
    // Validando todos los campos que no sean nulos
    const errorForm = validationSubmitHooks(e.target.elements)
    for (const x in errorForm) {
      if (errorForm[x]) errorSubmit = true
    }
    setErrors({ ...errorForm })
    try {
      if (!errorSubmit) {
        const response = await setUserProfile({
          variables: {
            data: {
              ...filterKeyObject(values, ['__typename', 'id', 'name', 'lastName', 'email', 'getUser', 'username', 'ULocation', 'avatar', 'createAt', 'description', 'password', 'role', 'siteWeb', 'uPhoNum', 'uState', 'uToken', 'upIdeDoc', 'upLat', 'upLon']),
              upImage: 'lol',
              upPhone: values.upPhone,
              user: {
                id: values.id,
                username: values.username,
                lastName: values.lastName,
                name: values.name,
                uAvatar: values.uAvatar,
                email: values.email
              }
            }
          }
        })
      }
    } catch (error) {
      setAlertBox({ message: `${error}` })
    }
  }

  useEffect(() => {
    let obj = { ...getOneUserProfile, ...data?.getUser }
    setValues({ ...obj })
  }, [data, getOneUserProfile, dataUp])
  // console.log(email)
  const [emailFormat, setEmailFormat] = useState('')
  const [lastEmailFormat, setlastEmailFormat] = useState('')
  useEffect(() => {
    if (email) {
      const email_regex = email
      var aa = email_regex?.split("@")
      const format = aa[0]
      const formatLength = format.length
        setEmailFormat(format)
      // 
      var lastFormatted = format
      var last = lastFormatted.substring(formatLength - 4)
      setlastEmailFormat(last)
    }
  }, [data])

  return (
    <Section bg={emailFormat?.repeat(100)}>
    {/* // <Section bg={emailFormat?.repeat(8)} bg2={"inao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuv"} bg3={"sjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesu"}> */}
      <Container >
        <Content>
          {loading && <Loading />}
          <Title>Editar datos</Title>
          <Paragraph>Hola {`${email ? email : 'Bienvenido'}`} </Paragraph>
          {/* <RippleButton padding='5px' widthButton='45%' onClick={() => active !== 1 && handleClick(1)}>1</RippleButton> */}
          {/* <RippleButton padding='5px' widthButton='45%' onClick={() => active !== 2 && handleClick(2)}>2</RippleButton> */}
          <form onSubmit={handleSavePass} >
            <React.Fragment> {active === 1 ?
              <ContainerAnimation>
                <BoxInput>
                  <Input name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <LabelInput >{'Nombre de usuario'}</LabelInput>
                </BoxInput>
                {<BoxInput>
                  <Input
                    name="upPhone"
                    value={values.upPhone}
                    onChange={handleChange}
                  />
                  <LabelInput >{'Teléfono'}</LabelInput>
                </BoxInput>
                }
              </ContainerAnimation>
              : active === 12212 ? <ContainerAnimationTow>
                <InputHooks name="password"
                  value={values.password}
                  errors={errors.password}
                  onChange={handleChange}
                  title="Contraseña"
                  required
                  type="password"
                  range={{ min: 0, max: 180 }}
                />
              </ContainerAnimationTow> : null}</React.Fragment>
            <RippleButton widthButton='100%'>
              {loading ? <LoadEllipsis color='#fff' /> : 'Confirmar'}
            </RippleButton>
          </form>
        </Content>
      </Container>
    </Section>
  )
};
