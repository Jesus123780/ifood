import React from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { CREATE_SCHEDULE_STORE, GET_CAT_OF_PRODUCTS, GET_SCHEDULE_STORE, REGISTER_CAT_OF_PRODUCTS } from './queriesStore'
import { LoadEllipsis } from '../../components/LoadingButton'
import moment from 'moment'
import { TimeSlotsList } from './styled'
import { useFormTools } from '../../components/BaseForm'
import InputHooks from '../../components/InputHooks/InputHooks'
import { AwesomeModal } from '../../components/AwesomeModal'
import { useSetState } from '../../components/hooks/useState'
import { ButtonAction } from './styledStore'

export const ManageCategories = () => {
    const [newRegisterFoodProduct, { loading, error }] = useMutation(REGISTER_CAT_OF_PRODUCTS)
    const { data } = useQuery(GET_CAT_OF_PRODUCTS, { variables: { idStore: 'MTA4ODM1NTI1OTQwNjA2NTgwMA==' }, fetchPolicy: 'cache-and-network' })
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const SHOW_CATEGORIES = useSetState(false)

    // const { data, loading: loadingCTP, error: erring } = useQuery(GET_CAT_OF_PRODUCTS,  { variables: { idStore: 'MTA4ODM1NTI1OTQwNjA2NTgwMA==' } })
    console.log(data)
    const handleForm = (e, show) =>
        handleSubmit({
            event: e,
            action: () => {
                return newRegisterFoodProduct({
                    variables: {
                        ...dataForm
                    }
                })
            },
            actionAfterSuccess: () => {
                setDataValue({})
            }
        })
    return (
        <div>
            <AwesomeModal backdrop='static' zIndex='9990' padding='25px' height='600px' show={SHOW_CATEGORIES.state} onHide={() => { SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state) }} onCancel={() => false} size='1000px' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                <form onSubmit={handleSubmit}>
                    <InputHooks
                        title='Nombre de la categoria'
                        width='100%'
                        required
                        error={errorForm?.catName}
                        value={dataForm?.catName}
                        onChange={handleChange}
                        name='catName'
                    />
                    <InputHooks
                        TypeTextarea
                        title='Description'
                        width='100%'
                        required
                        error={errorForm?.catDescription}
                        value={dataForm?.catDescription}
                        onChange={handleChange}
                        name='catDescription'
                    />
                </form>
                <ButtonAction onClick={() => SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state)}>
                    Administrar Categorias
                </ButtonAction>
            </AwesomeModal>
            <ButtonAction onClick={() => SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state)}>
                Administrar Categorias
            </ButtonAction>
            {data?.getAllCatOfProducts?.map(x => (
                <div key={x.cpId}>
                    Holaaaaaaaaxxxxxaaaaaaaaaaaa
                </div>
            ))}
        </div>
    )
}
