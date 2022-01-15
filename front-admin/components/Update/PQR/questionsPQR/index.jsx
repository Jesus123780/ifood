import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { GET_TYPE_PQR } from '../queries'
import { Container } from './styled'
import InputHooks from '../../../InputHooks/InputHooks'
import { RippleButton } from '../../../Ripple'
import { IconArrowRight } from '../../../../assets/icons/icons'
import { SFColor, SFVColor } from '../../../../assets/colors'
import NewSelect from '../../../NewSelectHooks/NewSelect'
import { validationSubmitHooks } from '../../../../utils'
import { icons } from '../StorePqr/codeIcon'
export const Questions = () => {
    const { data, loading, error: errorC } = useQuery(GET_TYPE_PQR)

    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
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
            return alert('Por favor, verifique que los Campos estén correctos.')
        }
        const { username, name, email, password, ConfirmPassword } = values
        if (ConfirmPassword !== password) {
            alert('Las contraseñas no coinciden')
        }
        try {
            if (!errorSubmit) {
                const results = await null({
                    variables: {
                        input: {
                            username,
                            email,
                            password,
                            name,
                        }
                    }

                })
                setValues({})
                setErrors({} || [])
                // eslint-disable-next-line
                console.log(results)
            }
        } catch (error) {
            // eslint-disable-next-line
            console.log(error)
        }
    }
    if (errorC) return <>Ocurrió un error interno</>
    return (<>
        {loading && <i>Cargando datos</i>}
        <Container>
            <Content>
                {!loading &&
                    <CardWrapper>
                        <Form onSubmit={handleRegister}>
                            <NewSelect search disabled={!data?.typopqr} options={data?.typopqr?.filter(x => x?.thpName === x?.thpName) || []} id='thpId' name='thpId' value={values?.thpId || ''} optionName='thpName' title='Categoría Pregunta' onChange={handleChange} margin='10px' />
                            <InputHooks
                                title='Pregunta'
                                required
                                type="text"
                                errors={values?.hpqrQuestion}
                                value={values?.hpqrQuestion}
                                onChange={handleChange}
                                name='hpqrQuestion'
                            />
                            <div style={{ position: 'relative' }}>
                                <TextArea name='hpqrAnswer' onChange={handleChange} type='text' />
                                <LabelInput>Escribe tu respuesta</LabelInput>
                            </div>
                            <RippleButton bgColor='#ebebeb' label='Publicar' />
                        </Form>
                    </CardWrapper>
                }
                <CardWrapper>
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column ', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 12%)' }}>
                        {/* eslint-disable-next-line */}
                        {!!data?.typopqr && data.typopqr.map(x => <QuestionsList title={x.thpName} icon={icons.find(j => j.index == x.thpIcon)?.icon} iconArrow={<IconArrowRight color='red' size='10px' />} />)}
                    </div>
                </CardWrapper>

            </Content>
        </Container>
    </>
    )
}
const QuestionsList = ({ icon, title, iconArrow }) => {
    return (
        <ContainerQuestion>
            <AndesListItem>
                <ItemFirstColumn>
                    <>{icon}</>
                    <ItemPrimary>{title}</ItemPrimary>
                </ItemFirstColumn>
                <span>{iconArrow}</span>
            </AndesListItem>
        </ContainerQuestion>
    )
}
// Questions List
const ContainerQuestion = styled.div`
    min-height: 56px;
    border-bottom: .0625em solid #e6e6e6;
    outline: none;
    border-left: solid transparent;
    &:hover{
        background-color: #fff;
        border-left: solid;
        color: #3483fa;
    }
    `
const AndesListItem = styled.div`
    display: flex;
    outline: none;
    justify-content: space-between;
    cursor: pointer;
    padding: 0 1.1428571429em;
    height: 100%;
    align-items: center;
`
const ItemPrimary = styled.span`
    font-size: 16px;
    color: rgba(0,0,0,.8);
    font-family: PFont-Regular;
    margin-left: 20px;
`
const ItemFirstColumn = styled.div`

`

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content:center;
    flex-wrap: wrap;
    flex-direction: row;
    height: 100%;

`
// const AnimationPulse = keyframes`
// 	0% {
// 		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
// 	}

// 	70% {
// 		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
// 	}

// 	100% {
// 		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
// 	}
// `
// const DataLength = styled.span`
//     position: absolute;
//     right: 0;
//     margin: auto;
//     top: -35px;
//     font-family: PFont-Regular;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border-radius: 100%;
//     height: 30px;
//     width: 30px;
//     animation: 2s ease infinite ${ AnimationPulse } ;
// `
const CardWrapper = styled.div`
    width: 40%;
    display: flex;
    justify-content:center;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 0 10px;

`
const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content:center;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 5px;
    & > button {
        width: 50%;
        margin: auto;
    }
`
export const LabelInput = styled.span`
    position: absolute;
    font-size: ${ ({ value }) => value ? '11px' : '13px' };
    top: ${ ({ value }) => value ? '-17px' : '10px' };
    left: ${ ({ left }) => left ? left : '10px' };
    color: ${ ({ value }) => value ? SFColor : SFVColor };
    transition: .3s;
    pointer-events: none;
    font-weight: ${ ({ value }) => value ? 600 : 400 };
`

export const TextArea = styled.textarea`
    width: 100%;
    height: ${ ({ height }) => height ? height : '0' };
    font-size: 15px;
    padding: 15px;
    outline: none;
    max-width: 98.5%;
    min-width: 99%;
    min-height: 200px;
    border: 1px solid #cccccc42;
    &:focus ~ ${ LabelInput } {
        top: -17px;
        font-size: 15px;
    }
    & ~ ${ LabelInput } {
        top: ${ ({ value }) => value ? '-17px' : '10px' };
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