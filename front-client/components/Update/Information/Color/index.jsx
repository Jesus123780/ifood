import { useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import { useMutation, useQuery } from '@apollo/client'
import { PColor } from '../../../../assets/colors'
import { Context } from '../../../../Context'
import { IconDelete, IconDost, IconEdit } from '../../../../assets/icons/icons'
import { GET_ALL_COLOR, UPDATE_COLOR } from '../../../../gql/information/Color'
import { validationSubmitHooks } from '../../../../utils'
import InputHooks from '../../../InputHooks/InputHooks'
import { RippleButton } from '../../../Ripple'
import { Container,
    Form,
    ContainerTask,
    OptionsFunction,
    Button, ListTask,
    ContainerList,
    ContentModal,
    AwesomeModal
} from './styled'

export const Colors = () => {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const [createColor] = useMutation(UPDATE_COLOR);
    const { data } = useQuery(GET_ALL_COLOR)
    const [show, setShow] = useState(false)
  //  const { setAlertBox } = useContext(Context)

    const handleSubmit = (e, colorId) => {
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
            createColor({ variables: { input : { colorName: values.colorName, colorId } }, update(cache) {
                cache.modify({
                    fields: {
                        getAllColor(dataOld=[]){
                            return cache.writeQuery({ query: GET_ALL_COLOR, data: dataOld })
                        }
                    }
                })
            } }).catch(err=> setAlertBox({ message: `${ err }`, duration: 7000 }))
        }
    }
    const { modal, setModal } = useContext(Context);

    return (<>
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputHooks
                    name='colorName'
                    title='Ingresa un color'
                    required
                    errors={values?.colorName}
                    value={values?.colorName}
                    onChange={handleChange}
                />
                <RippleButton label='color' type={'submit'} />
            </Form>
            <ContainerList>
                {data?.getAllColor?.map(x => (<div key={x?.colorId}>
                    <ContainerTask show={show === x}>
                        <OptionsFunction show={show === x}>
                            <Button><IconDelete size={30} color={PColor} /></Button>
                            <Button><IconEdit size={30} /></Button>
                        </OptionsFunction>
                        <ListTask show={show === x}>
                            {x.colorName}
                        </ListTask>
                        <div style={{ display: 'contents' }}><Button onClick={() => setShow(x === show ? false : x)}><IconDost size={30} color={show === x ? PColor : '#CCC'} /></Button></div>
                    </ContainerTask>

                </div>))}

            </ContainerList>
        </Container>
        {/* {ReactDOM.createPortal(<>
            <ContentModal onClick={e => e.stopPropagation()} modal={modal} onClick={() => setModal(!modal)}>
                <AwesomeModal onClick={e => e.stopPropagation()} modal={modal}>
                    Hola
                </AwesomeModal>
            </ContentModal>
        </>, document.getElementById('root')
        )} */}
    </>
    )
}