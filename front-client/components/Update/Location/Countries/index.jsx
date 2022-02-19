import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styled, { keyframes } from 'styled-components'
import { Context } from '../../../../Context'
import InputHooks from '../../../InputHooks/InputHooks'
import { LoadEllipsis } from '../../../LoadingButton'
import { RippleButton } from '../../../Ripple'
// import { PColor, SFColor, SFVColor } from '../../../../assets/colors'
// import { IconEdit, IconDost, IconDelete } from '../../../../assets/icons/icons'
import { DELETE_ONE_COUNTRIES, GET_COUNTRY, UPDATE_COUNTRIES } from './queries'
import { validationSubmitHooks } from '../../../../utils'
import { icons } from './codeCountries'
import { EditForm } from './EditForm'
import { Container, Form, Card, ContainerTask, OptionsFunction, Button, ListTask } from './styled'
import { PColor, SFColor, SFVColor } from '../../../../public/colors'
import { IconEdit, IconDost, IconDelete } from '../../../../public/icons'

export const Countries = () => {
    const [createCountry, { loading }] = useMutation(UPDATE_COUNTRIES)
    const { setAlertBox } = useContext(Context)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    // Query para traer a todos los países
    const { data } = useQuery(GET_COUNTRY)
    const [deleteCountries] = useMutation(DELETE_ONE_COUNTRIES)

    // Mutación para subir un país
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
                createCountry({
                    variables: { input: { cName: values.cName, cCalCod: values.cCalCod } }, update(cache) {
                        cache.modify({
                            fields: {
                                countries(dataOld = []) {
                                    return cache.writeQuery({ query: GET_COUNTRY, data: dataOld })
                                }
                            }
                        })
                    }
                }).catch(err => setAlertBox({ message: `${err}`, duration: 7000 }))
            }
        } catch (error) {
            setValues({})
            setErrors({})
            // eslint-disable-next-line
            setAlertBox({ message: `${error}`, duration: 7000 })
            setAlertBox({ message: 'se ha producido un error interno', duration: 7000, color: 'error' })

        }
    }
    const [show, setShow] = useState(false)
    useEffect(() => {
        const body = document.body
        body.addEventListener('keyup', e => e.code === 'Escape' && setShow(false))
        return () => body.removeEventListener('keyup', () => setShow)

    }, [setShow])
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });
    const submitUpdate = () => {
        setEdit({
            id: null,
            value: ''
        });
    };
    if (edit.id) {
        return <EditForm edit={edit} onSubmit={submitUpdate} />;
    }
    const handleUpdate = async index => {
        const { cId } = index
        const results = await deleteCountries({
            variables: {
                input: {
                    cId
                }, update(cache) {
                    cache.modify({
                        fields: {
                            clients() {
                                const newData = data?.countries.filter(x => x.cId !== index.cId) || []
                                return cache.writeQuery({ query: GET_COUNTRY, data: newData })
                            }
                        }
                    })
                }
            }
        })
        if (results) setAlertBox({ message: 'País Eliminado con éxito', duration: 5000, color: 'success' })
    }
    return (<>
        <Container>
            <Form onSubmit={handleRegister}>
                <InputHooks
                    title='Ingresa un país'
                    required
                    errors={values?.cName}
                    value={values?.cName}
                    onChange={handleChange}
                    name='cName'
                />
                <InputHooks
                    title='Ingresa código del país'
                    required
                    errors={values?.cCalCod}
                    value={values?.cCalCod}
                    onChange={handleChange}
                    name='cCalCod'
                />
                <RippleButton>
                    {!loading ? 'Subir' : <LoadEllipsis color='#fff' />}
                </RippleButton>
            </Form>
            <Card>
                {data?.countries ? data?.countries.map(index => (
                    <ContainerTask show={show === index} key={index.cId}>
                        <OptionsFunction show={show === index}>
                            <Button onClick={() => handleUpdate({ ...index, cState: 0 })}><IconDelete size={30} /></Button>
                            <Button onClick={() => setEdit({ id: index, value: index.cName })} ><IconEdit size={30} /></Button>
                            {/* Todo Success */}
                        </OptionsFunction>
                        {/* Tareas */}
                        <ListTask show={show === index}>
                            {/* eslint-disable-next-line */}
                            <Options icon={icons.find(j => j.cCalCod == index.cCalCod)?.icon} name={icons.find(j => j.cCalCod == index.cCalCod)?.cCalCod}></Options>
                            {index.cName}
                        </ListTask>
                        <div style={{ display: 'contents' }}><Button onClick={() => setShow(index === show ? false : index)}><IconDost size={30} color={show === index ? PColor : '#CCC'} /></Button></div>
                    </ContainerTask>
                )) : <i>No hay ningún país en base de datos</i>}
            </Card>
        </Container>
    </>
    )
}

const Options = ({ icon, name }) => {

    return (
        <React.Fragment>
            <div>
                {icon}
            </div>
            <div>
                <Text>
                    {name ? ` + ${name}` : 'COD'}
                </Text>
            </div>
        </React.Fragment>
    )
}
export const LabelInput = styled.span`
    position: absolute;
    font-size: ${({ value }) => value ? '11px' : '13px'};
    top: ${({ value }) => value ? '-17px' : '10px'};
    left: ${({ left }) => left ? left : '10px'};
    color: ${({ value }) => value ? SFColor : SFVColor};
    transition: .3s;
    pointer-events: none;
    font-weight: ${({ value }) => value ? 600 : 400};
`
export const Text = styled.span`
    font-size: 16px !important;
    font-family: PFont-Light;
`

export const TextArea = styled.textarea`
    width: 100%;
    height: ${({ height }) => height ? height : '0'};
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
        top: ${({ value }) => value ? '-17px' : '10px'};
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