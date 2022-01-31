/* eslint-disable react/prop-types */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
export const Context = createContext()
const Provider = ({ children }) => {
    // STATE
    const router = useRouter()
    const [error, setError] = useState({})
    // State to Session
    const [isStore, setStore] = useState({})
    // Effects para el Toast
    useEffect(() => {
        !!error?.message &&
      setTimeout(() => setError(''), error.duration || 7000)
    }, [error])
    const [collapsed, setCollapsed] = useState(false)
    // Context to setStoreLink
    const DataStore = useMemo(
        () => ({
            isStore
        }),
        [isStore]
    )
    const setStoreLink = useCallback(
        sessionValue => setStore(sessionValue),
        []
    )
    useEffect(() => { }, [isStore])
    // Verify state
    const [menu, setMenu] = useState(0)
    const handleMenu = index => setMenu(index === menu ? false : index)
    const initialStoreState = {
        idStore: undefined,
        'fstr.device_id': undefined,
        idStore: undefined
    }
    // Context LastStore
    const [Store, setStoreId] = useState(initialStoreState)
    const useStore = idStore => {
        setStoreId({
            ...Store,
            idStore
        })
        if (typeof idStore !== 'undefined') {
            localStorage.setItem('idStore', idStore)
        }
    }
    useEffect(() => {
        if (localStorage.getItem('idStore') !== Store.idStore) {
            setStoreId({
                ...Store,
                idStore: localStorage.getItem('idStore')
            })
        }
    }, [Store])

    // Context to session
    const [isSession, setIsSession] = useState()
    const setSessionActive = useCallback(
        sessionValue => setIsSession(sessionValue),
        [isSession]
    )
    useEffect(() => {
        if (!isSession) {
            setIsSession(null)
        } else {
            setIsSession(isSession)
        }
    }, [isSession])

    const authData = useMemo(
        () => ({
            isSession
        }),
        [isSession]
    )
    const [alert, setAlert] = useState(false)
    const value = useMemo(
        () => ({
            error,
            DataStore,
            // Link
            setStoreLink,
            setCollapsed,
            isStore,
            handleMenu,
            // Menu Ctx
            menu,
            collapsed,
            isSession,
            setIsSession,
            // State login
            authData,
            setSessionActive,
            // UseStore
            useStore,
            Store,
            // setAlertBox
            alert,
            setAlertBox: err => setError(err)
        }),
        []
    )

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

Provider.propTypes = {
    children: PropTypes.array
}
const useAuth = () => useContext(Context)

export { Provider as default, useAuth }
