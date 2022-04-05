import { useLazyQuery, useSubscription, useMutation } from '@apollo/client'
import { MessageComp } from 'components/Messages'
import { ContainerContextMessage } from 'components/Messages/styled'
import { GET_USER } from 'container/profile/queries'
// import { Context } from 'Context'
import { GET_MESSAGES, NEW_MESSAGE, SEND_MESSAGES } from 'gql/Messages'
import React, { useContext, useEffect, useState } from 'react'
import { validationSubmitHooks } from 'utils'
import { Context } from '../../context/index'

export const Messages = () => {
    //ESTADOS
    const [selectedStore, setSelectedStore] = useState(null)
    const [show, setShow] = useState(false)
    const { setAlertBox } = useContext(Context)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [search, setSearch] = useState('')
    const handleChangeFilter = e => {
        setSearch(e.target.value)
    }
    // Busca un usuario seleccionado
    // const { data: OneUser } = useQuery(GET_USER, {
    //     variables: {
    //         username: selectedStore
    //     }
    // })
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const [getMessages, { data: messageData, refetch }] = useLazyQuery(GET_MESSAGES, {
        context: { clientName: "admin-server" },
        fetchPolicy: 'network-only',
        onError: err => setAlertBox({
            message: `${err}`,
            duration: 10000,
            color: 'warning'
        })
    })
    useEffect(() => {
        refetch
    }, [refetch])
    const [sendMessage, { loading }] = useMutation(SEND_MESSAGES, {
        context: { clientName: "admin-server" }
    })
    //EFECTOS
    useEffect(() => {
        // if (selectedStore) {
            getMessages({ variables: { from: 'MjcyMDg4ODE0ODUxNTE2NDUw' } })
        // }
    }, [])
    useEffect(() => {
        const body = document.body
        body.addEventListener('keyup', e => e.code === 'Escape' && setShow(false))
        return () => body.removeEventListener('keyup', () => setShow)
    }, [setShow])

    // HANDLESS
    console.log(values)
    const handleSendMessage = async e => {
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
            return setAlertBox({
                message: 'Por favor, verifique que los Campos estén correctos.',
                duration: 10000,
                color: 'warning'
            })
        }
        try {
            if (!errorSubmit) {
                sendMessage({
                    variables: { to: 'MjcyMDg4ODE0ODUxNTE2NDUw', content: values.content }, update(cache) {
                        cache.modify({
                            fields: {
                                getMessages(dataOld = []) {
                                    return cache.writeQuery({ query: GET_MESSAGES, data: dataOld })
                                }
                            }
                        })
                    }
                }).catch(err => setAlertBox({ message: `${err}`, duration: 7000 }))
            }
            // setValues({})
        } catch (error) {
            setAlertBox({
                message: error.message,
                duration: 10000,
                color: 'warning'
            })
        }

    }
    // Filtro de los usuarios
    // subscription's mensajes
    const { data: messageDataNew, error: messageError } = useSubscription(NEW_MESSAGE)
    useEffect(() => {
        if (messageError) console.log(messageError)
        if (messageDataNew) console.log(messageDataNew)
    }, [messageError, messageData])
    return (
        <ContainerContextMessage>
            <MessageComp
                search={search}
                messageData={messageData?.getMessages}
                setSelectedStore={setSelectedStore}
                // data={data?.getAllUser}
                selectedStore={selectedStore}
                loading={loading}
                // OneUser={OneUser?.getUser}
                values={values}
                handleSendMessage={handleSendMessage}
                handleChangeFilter={handleChangeFilter}
                handleChange={handleChange}
                show={show}
                setShow={setShow}
            />
        </ContainerContextMessage>
    )
}
