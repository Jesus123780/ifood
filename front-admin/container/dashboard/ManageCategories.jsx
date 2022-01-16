import React from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { CREATE_SCHEDULE_STORE, GET_CAT_OF_PRODUCTS, GET_SCHEDULE_STORE, REGISTER_CAT_OF_PRODUCTS } from './queriesStore'
import { LoadEllipsis } from '../../components/LoadingButton'
import moment from 'moment'
import { Card, ContentCard, Text, TimeSlotsList } from './styled'
import { useFormTools } from '../../components/BaseForm'
import InputHooks from '../../components/InputHooks/InputHooks'
import { AwesomeModal } from '../../components/AwesomeModal'
import { useSetState } from '../../components/hooks/useState'
import { ButtonAction } from './styledStore'
import { updateCache } from '../../utils'

export const ManageCategories = () => {
    const [createCatOfProducts, { loading, error }] = useMutation(REGISTER_CAT_OF_PRODUCTS)
    const { data } = useQuery(GET_CAT_OF_PRODUCTS, { variables: { idStore: 'MjE3NjcxMDUxODgxMjEzMTYwMA==' }, fetchPolicy: 'cache-and-network' })
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const SHOW_CATEGORIES = useSetState(false)

    // const { data, loading: loadingCTP, error: erring } = useQuery(GET_CAT_OF_PRODUCTS,  { variables: { idStore: 'MjE3NjcxMDUxODgxMjEzMTYwMA==' } })
    console.log(data)
    const handleForm = (e) =>
        handleSubmit({
            event: e,
            action: () => {
                return createCatOfProducts({
                    variables: {
                        input: {
                            idStore: 'MjE3NjcxMDUxODgxMjEzMTYwMA==',
                            catName: dataForm?.catName,
                            catDescription: dataForm?.catDescription,

                        }
                    },
                    update: (cache, { data: { getAllCatOfProducts } }) => updateCache({
                        cache,
                        query: GET_CAT_OF_PRODUCTS,
                        nameFun: 'getAllCatOfProducts',
                        dataNew: getAllCatOfProducts
                    })
                })
            },
            actionAfterSuccess: () => {
                setDataValue({})
                SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state)
            }
        })
    return (
        <div>
            {/* <AwesomeModal backdrop='static' zIndex='9990' bgColor='transparent' padding='25px' height='600px' show={SHOW_CATEGORIES.state} onHide={() => { SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state) }} onCancel={() => false} size='1000px' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' > */}
                <form onSubmit={(e) => handleForm(e)}>
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
                    <ButtonAction type='submit'>
                        Submit
                    </ButtonAction>
                </form>
                <ButtonAction onClick={() => SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state)}>
                    Registrar  Categorias de productos
                </ButtonAction>
            {/* </AwesomeModal> */}
            <ButtonAction onClick={() => SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state)}>
                Administrar Categorias
            </ButtonAction>
            <ContentCard>
                {data?.getAllCatOfProducts?.map(x => (
                    <Card margin='0' height='300px' width='30%' key={x.cpId}>
                        <div >
                            <Text size='20px' >{x.catName}</Text>
                            <Text size='20px' >{x.catDescription}</Text>
                        </div>
                    </Card>
                ))}
            </ContentCard>
        </div>
    )
}
