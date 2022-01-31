import { useMutation, useQuery } from '@apollo/client'
import { useContext, useState } from 'react'
import { PColor } from '../../../../assets/colors'
import { IconDelete, IconDost, IconEdit } from '../../../../assets/icons/icons'
import { Context } from '../../../../Context'
import { GET_ALL_SIZE, UPDATE_SIZE } from '../../../../gql/information/Size/size'
import { validationSubmitHooks } from '../../../../utils'
import InputHooks from '../../../InputHooks/InputHooks'
import { RippleButton } from '../../../Ripple'
import { Container, Form, ContainerTask, OptionsFunction, Button, ListTask, ContainerList } from './styled'

export const Size = () => {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const [createSize] = useMutation(UPDATE_SIZE);
    const { data } = useQuery(GET_ALL_SIZE)
    const [show, setShow] = useState(false)
  //  const { setAlertBox } = useContext(Context)
    // Mutación para subir unA TALLA
    const handleSubmit = e => {
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
        if (!errorSubmit) {
            // const cDatCre = moment().format('HH:mm A')
            createSize({ variables: { input : { sizeName: values.sizeName } }, update(cache) {
                cache.modify({
                    fields: {
                        getSizes(dataOld=[]){
                            return cache.writeQuery({ query: GET_ALL_SIZE, data: dataOld })
                        }
                    }
                })
            } }).catch(err=> setAlertBox({ message: `${ err }`, duration: 7000 }))
        }
    }
    return (<>
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputHooks
                    name='sizeName'
                    title='Ingresa una talla'
                    required
                    range={{ min: 0, max: 7 }}
                    errors={values?.sizeName}
                    value={values?.sizeName}
                    letters
                    onChange={handleChange}
                />
                <RippleButton label='Subir' type={'submit'} />
            </Form>
            <ContainerList>
                {data?.getSizes?.map(x => (<div key={x?.sizeId}>
                    <ContainerTask show={show === x}>
                        <OptionsFunction show={show === x}>
                            <Button><IconDelete size={30} color={PColor} /></Button>
                            <Button><IconEdit size={30} /></Button>
                        </OptionsFunction>
                        <ListTask show={show === x}>
                            {x.sizeName}
                        </ListTask>
                        <div style={{ display: 'contents' }}><Button onClick={() => setShow(x === show ? false : x)}><IconDost size={30} color={show === x ? PColor : '#CCC'} /></Button></div>
                    </ContainerTask>

                </div>))}

            </ContainerList>
        </Container>
    </>
    )
}