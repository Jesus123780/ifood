import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { object } from 'prop-types'
import { decodeToken, getToken } from '../utils'
export const Context = createContext    ()
const Provider = ({ children }) => {
    // STATE
    const router = useRouter()
    const [error, setError] = useState({})
    // State to Session
    const [isCompany, setCompany] = useState({})
    // Effects para el Toast
    useEffect(() => {
        !!error?.message &&
            setTimeout(() => setError(''), error.duration || 7000)
    }, [error])
    const [collapsed, setCollapsed] = useState(undefined)
    // Context to setCompanyLink
    const DataCompany = useMemo(
        () => ({
            isCompany
        }),
        [isCompany]
    )
    const setCompanyLink = useCallback(sessionValue => setCompany(sessionValue), [])
    useEffect(() => { }, [isCompany])
    // Verify state
    const [menu, setMenu] = useState(0)
    const handleMenu = index => setMenu(index === menu ? false : index)
    const initialCompanyState = {
        idLasComp: undefined
    }
    const [company, setCompanyId] = useState(initialCompanyState)
    // Context to session
    const [isSession, setIsSession] = useState(undefined)
    const setSessionActive = useCallback(
        sessionValue => setIsSession(sessionValue),
        [isSession]
    )
    useEffect(() => {
        const token = getToken()
        if (!token) {
            setIsSession(null)
        } else {
            setIsSession(decodeToken(token))
        }
    }, [])
    const authData = useMemo(
        () => ({
            isSession
        }),
        [isSession]
    )
    const value = {
        error,
        DataCompany,
        // Link
        setCompanyLink,
        setCollapsed,
        isCompany,
        handleMenu,
        // Menu Ctx
        menu,
        collapsed,
        isSession,
        setIsSession,
        authData,
        setSessionActive,
        company,
        setAlertBox: err => setError(err)
    }
    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default {
    Provider,
    Consumer: Context.Consumer
}
Provider.propTypes = {
    children: object.isRequired
}
