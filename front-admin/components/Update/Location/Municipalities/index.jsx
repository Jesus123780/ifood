import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styled, { keyframes } from 'styled-components'
import InputHooks from '../../../InputHooks/InputHooks'
import NewSelect from '../../../NewSelectHooks/NewSelect'
import { LoadEllipsis } from '../../../LoadingButton'
import { RippleButton } from '../../../Ripple'
import { validationSubmitHooks } from '../../../../utils'
import { Context } from '../../../../context/Context'
import { GET_MUNICIPALITIES, UPDATE_MUNICIPALITIES } from './queries'
import { GET_DEPARTMENT } from '../Departments/queries'
import { EditForm } from './EditForm'
import { Container, Form, Card, ContainerTask, OptionsFunction, Button, ListTask } from './styled'
import { PColor } from '../../../../public/colors'
import { IconEdit, IconDost, IconDelete } from '../../../../public/icons'

export const Municipalities = () => {
  const [createCity, { loading }] = useMutation(UPDATE_MUNICIPALITIES)
  const { setAlertBox } = useContext(Context)
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  // Query para traer a todos los Departamentos
  const { data } = useQuery(GET_DEPARTMENT)
  const { data: dataMunicipalities } = useQuery(GET_MUNICIPALITIES)
  const handleRegister = async e => {
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
    if (errorSubmit) {
      setAlertBox({ message: 'Por favor, verifique que los Campos estén correctos', duration: 5000 })
    }
    try {
      if (!errorSubmit) {
        createCity({
          variables: { input: { dId: values.dId, cName: values.cName } }, update(cache) {
            cache.modify({
              fields: {
                getCities(dataOld = []) {
                  return cache.writeQuery({ query: GET_MUNICIPALITIES, data: dataOld })
                }
              }
            })
          }
        }).catch(err => { return setAlertBox({ message: `${err}`, duration: 7000 }) })
      }
    } catch (error) {
      setValues({})
      setErrors({})
      setAlertBox({ message: `${error}`, duration: 7000 })
    }
  }
  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  })
  const submitUpdate = () => {
    setEdit({
      id: null,
      value: ''
    })
  }
  if (edit?.id) {
    return <EditForm edit={edit} onSubmit={submitUpdate} />
  }
  return (<>
    <Container>
      <Form onSubmit={handleRegister}>
        <NewSelect
          disabled={!data?.department[0]?.cId}
          id='dId'
          margin='10px'
          name='dId'
          onChange={handleChange}
          optionName='dName'
          options={data?.department?.filter(x => { return x?.dName === x?.dName }) || []}
          search
          title='Selecciona un departamento'
          value={values?.dId || ''}
        />
        <InputHooks
          errors={values?.cName}
          name='cName'
          onChange={handleChange}
          required
          title='Ingresa una cuidad'
          value={values?.cName}
        />
        <RippleButton>
          {!loading ? 'Subir' : <LoadEllipsis color='#fff' />}
        </RippleButton>
      </Form>
      <Card>
        {dataMunicipalities?.getCities ? dataMunicipalities?.getCities?.map(index => {
          return (
            <ContainerTask key={index.ctId} show={show === index}>
              <OptionsFunction show={show === index}>
                <Button><IconDelete size={30} /></Button>
                <Button onClick={() => { return setEdit({ id: index.ctId, value: index.cName }) }} ><IconEdit size={30} /></Button>
                {/* Todo Success */}
              </OptionsFunction>
              {/* Tareas */}
              <ListTask show={show === index}>
                {/* eslint-disable-next-line */}
                                {index.cName}
              </ListTask>
              <div style={{ display: 'contents' }}><Button onClick={() => { return setShow(index === show ? false : index) }}><IconDost color={show === index ? PColor : '#CCC'} size={30} /></Button></div>
            </ContainerTask>
          )
        }) : <i>No hay ninguna cuidad en base de datos</i>}
      </Card>
    </Container>
  </>
  )
}
export const LabelInput = styled.span`
    position: absolute;
    font-size: ${({ value }) => { return value ? '11px' : '13px' }};
    top: ${({ value }) => { return value ? '-17px' : '10px' }};
    left: ${({ left }) => { return left ? left : '10px' }};
    transition: .3s;
    pointer-events: none;
    font-weight: ${({ value }) => { return value ? 600 : 400 }};
`

export const TextArea = styled.textarea`
    width: 100%;
    height: ${({ height }) => { return height ? height : '0' }};
    font-size: 15px;
    padding: 15px;
    outline: none;
    max-width: 98.5%;
    min-width: 99%;
    min-height: 200px;
    border: 1px solid #cccccc42;
    &:focus ~ ${LabelInput} {
        top: -17px;
        font-size: 15px;
    }
    & ~ ${LabelInput} {
        top: ${({ value }) => { return value ? '-17px' : '10px' }};
        font-size: 13px;
    }
`
export const AnimationRight = keyframes`
0% {
    transform: translateX(50vw);
    opacity: 0;
}
100% {
    transform: translateY(0);
    opacity: 1;
}
`