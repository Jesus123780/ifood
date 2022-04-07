import { useLazyQuery, useSubscription, useMutation, useQuery } from '@apollo/client'
import { useUser } from 'components/hooks/useUser'
import { MessageComp } from 'components/Messages'
import { ContainerContextMessage } from 'components/Messages/styled'
import { GET_USER } from 'container/profile/queries'
// import { Context } from 'Context'
import { GET_MESSAGES, NEW_MESSAGE, SEND_MESSAGES } from 'gql/Messages'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { validationSubmitHooks } from 'utils'
import { Context } from '../../context/index'
import { GET_ALL_STORY_ACTIVE_MESSAGE_ORDER } from './queries'
import { useApolloClient } from '@apollo/client'

export const Messages = () => {
    //ESTADOS
    const { setAlertBox, selectedStore, setStoreChatActive, hidden } = useContext(Context)
    const [show, setShow] = useState(false)
    const [dataUser, { loading: loUser }] = useUser()
    const { id } = dataUser || {}
    const [values, setValues] = useState({})

    const [errors, setErrors] = useState({})
    const [search, setSearch] = useState('')
    const handleChangeFilter = e => {
        setSearch(e.target.value)
    }
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    // QUERIES


    const [getMessages, { data: messageData, refetch, fetchMore }] = useLazyQuery(GET_MESSAGES, {
        context: { clientName: "admin-server" },
        fetchPolicy: 'network-only',
        onError: err => setAlertBox({
            message: `${err}`,
            duration: 10000,
            color: 'warning'
        })
    })
    const { data: dataStoreActiveOrder } = useQuery(GET_ALL_STORY_ACTIVE_MESSAGE_ORDER, {
        fetchPolicy: 'network-only',
        onError: err => console.log({
            message: `${err}`,
        })
    })
    const client = useApolloClient()
    // console.log(client)
    const { data: messageDataNew, error: messageError } = useSubscription(NEW_MESSAGE, {
        pollInterval: 10,
        onSubscriptionComplete: () => {
            // const dataMessage = client.readQuery({ query: GET_MESSAGES })
        },
        onSubscriptionData: ({ subscriptionData }) => {
            // client.writeQuery({
            //     query: GET_MESSAGES,
            //     // data: {
            //     //     ...messageData?.getMessages,
            //     //     getMessages: [
            //     //         ...messageData?.getMessages,
            //     //         newMessage,
            //     //     ]
            //     // }
            // })
        }
    })
    console.log(messageDataNew)
    const [dataMessage, setDataMessage] = useState([])
    useEffect(() => {
        if (messageError) console.log(messageError)
        messageData?.getMessages && setDataMessage([...messageData?.getMessages])
        if (messageDataNew) {
            setDataMessage([...dataMessage, messageDataNew?.newMessage])
        }
    }, [messageError, messageDataNew, messageData])
    // console.log(messageDataNew)
    console.log(dataMessage, 'NUEVO ARRAY')
    useEffect(() => {
        refetch
    }, [refetch])
    const [sendMessage, { loading }] = useMutation(SEND_MESSAGES, {
        context: { clientName: "admin-server" },
        // fetchPolicy: 'cache-and-network',
    })
    //EFECTOS
    useEffect(() => {
        if (selectedStore) {
            getMessages({ variables: { from: selectedStore?.getOneStore?.idStore } })
        }
    }, [selectedStore])


    // HANDLESS
    const input = useRef('')
    const messagesEndRef = useRef('')
    const { content } = values || {}
    useEffect(() => {
        var objDiv = document.getElementById('scroll');
        if (messagesEndRef && objDiv) {
            console.log(messagesEndRef.current)
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            objDiv.scrollTop = objDiv.scrollHeight
        }
    }, [messageData])

    const handleSendMessage = async e => {
        e.preventDefault()
        // input.current.focus()
        console.log(content, id)
        try {
            if (selectedStore && id && !!content) {
                sendMessage({
                    variables: { to: id, content: content }
                }).catch(res => {
                    // input.current.value = ''
                }).catch(err => setAlertBox({ message: `${err}`, duration: 7000 }))
            }
            setValues({})
        } catch (error) {
            setAlertBox({
                message: error.message,
                duration: 10000,
                color: 'warning'
            })
        }

    }
    // subscription's mensajes


    return (
        <ContainerContextMessage>
            <MessageComp
                search={search}
                messageData={dataMessage || []}
                setStoreChatActive={setStoreChatActive}
                data={dataStoreActiveOrder?.getAllStoreActiveChat || []}
                messagesEndRef={messagesEndRef}
                selectedStore={selectedStore}
                input={input}
                hidden={hidden}
                id={id}
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
