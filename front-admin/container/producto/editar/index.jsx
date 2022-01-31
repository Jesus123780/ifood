import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import InputHooks from '../../../components/InputHooks/InputHooks'
import { useFormTools } from '../../../components/BaseForm'

export const ProductEdit = ({ id }) => {
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const onchangek = (e) => {
        // const { value } = e.target
    }
    return (
        <Container>
            Ey aqui esta la param  {id}
            <Card>
                <form>
                <InputHooks
                    title='Nombre del Producto'
                    width={'100%'}
                    required
                    error={errorForm?.pName}
                    value={dataForm?.pName}
                    onChange={handleChange}
                    name='pName'
                />
                <InputHooks
                    title='Descuento'
                    width='100%'
                    required
                    numeric
                    error={errorForm?.ProDescuento}
                    value={dataForm?.ProDescuento}
                    onChange={handleChange}
                    name='ProDescuento'
                />
                <InputHooks
                    title='Precio'
                    width='100%'
                    required
                    numeric
                    error={errorForm?.ProPrice}
                    value={dataForm?.ProPrice}
                    onChange={handleChange}
                    name='ProPrice'    
                />
                <Inputdeker type='file' onChange={(event) => onchangek(event)}   />
                {/* <input id='hola' onChange={(event) => onchangek(event)}  value={'Hola'} /> */}
                <Button type='submit'>
                    Guardar y salir
                </Button>

                </form>
            </Card>
        </Container>
    )
}

ProductEdit.propTypes = {

}

const Card = styled.div`
    height: auto;
    padding: 20px;
    width: 55%;
    border: 1px solid;
`
const Container = styled.div`
    padding: 30px;
`
const Inputdeker = styled.input`
    padding: 30px;
    border: 1px solid;
`
const Button = styled.button`
    background-color: red;
    border-radius: 22px;
    padding: 10px;
    margin: 5px 5px;
` 
// const InputHooks = styled.input`
// margin: 5px;
// `


