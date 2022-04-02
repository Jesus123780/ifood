import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import InputHooks from 'components/InputHooks/InputHooks'
import React, { useContext } from 'react'
import { numberFormat, RandomCode, updateCache } from 'utils'
import { CREATE_PROVIDERS, GET_ALL_PROVIDERS } from './queries'
import { gql, useQuery, useMutation } from '@apollo/client'
import { RippleButton } from 'components/Ripple'
import { Context } from 'context/Context'

export const ProvidersCreate = ({ show, setShow }) => {
    const { setAlertBox } = useContext(Context)

    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError, errorSubmit }] = useFormTools()
    const [registerProviders, { loading }] = useMutation(CREATE_PROVIDERS, {
        onCompleted: (data) => {
            setAlertBox({ message: `${data.registerProviders.message}` })
            console.log(data)

        }
    })
    const handleForm = (e) =>
        handleSubmit({
            event: e,
            action: () => {
                // if (!TotalDeuda, !PrMail) {
                //     setForcedError({ ...errorForm, prName: true, PrNit: true, PrMail: true })
                // }
                const { TotalDeuda, PrMail } = dataForm
                return registerProviders({
                    variables: {
                        input: {
                            ...dataForm,
                            PrMail,
                            PrCode: RandomCode(9),
                            TotalDeuda: parseInt(TotalDeuda),
                        }
                    }, update(cache) {
                        cache.modify({
                            fields: {
                                getAllProviders(dataOld = []) {
                                    return cache.writeQuery({ query: GET_ALL_PROVIDERS, data: dataOld })
                                }
                            }
                        })
                    }
                }).then(() => {
                    // setDataValue({})
                })
            }
        })
    return (
        <AwesomeModal zIndex='9999' padding='25px' show={show} onHide={() => setShow()} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} >
            <form onSubmit={(e) => handleForm(e)}>
                <InputHooks title='Nombre' width={'50%'} required email={false} error={errorForm?.prName} value={dataForm?.prName} onChange={handleChange} name='prName' />
                <InputHooks title='Nit del proveedor' width={'50%'} required numeric error={errorForm?.PrNit} value={dataForm?.PrNit} onChange={handleChange} name='PrNit' />
                <InputHooks title='Numero Teléfono' width={'50%'} numeric type='text' error={errorForm?.PrNumberPhone} value={dataForm?.PrNumberPhone} onChange={handleChange} name='PrNumberPhone' />
                <InputHooks title='¿ Alguna deuda Anterior ?' width={'50%'} numeric error={errorForm?.TotalDeuda} value={dataForm?.TotalDeuda} onChange={handleChange} name='TotalDeuda' />
                <InputHooks title='Numero de indentidad' width={'50%'} numeric error={errorForm?.PrNumberIdentity} value={dataForm?.PrNumberIdentity} onChange={handleChange} name='PrNumberIdentity' />
                <InputHooks title='Dirección email' width={'50%'} required email={true} setDataValue={setDataValue} error={errorForm?.PrMail} dataForm={dataForm} value={dataForm?.PrMail} onChange={handleChange} name='PrMail' />
                <RippleButton type='submit' widthButton='100%' >Crear Proveedor</RippleButton>
            </form>
        </AwesomeModal>
    )
}
