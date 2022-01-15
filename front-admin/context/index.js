import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { decodeToken, getToken } from '../utils'
export const Context = createContext()
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
    // Context LastCompany
    const [company, setCompanyId] = useState(initialCompanyState)
    // const useCompany = idLasComp => {
    //     setCompanyId({
    //         ...company,
    //         idLasComp
    //     })
    //     if (typeof idLasComp !== 'undefined') {
    //         localStorage.setItem('idLasComp', idLasComp)
    //     }
    // }
    // useEffect(() => {
    //     if (localStorage.getItem('idLasComp') !== company.idLasComp) {
    //         setCompanyId({
    //             ...company,
    //             idLasComp: localStorage.getItem('idLasComp')
    //         })
    //     }
    // }, [company])

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
        // State login
        authData,
        setSessionActive,
        // UseCompany
        // useCompany,
        company,
        // setAlertBox
        setAlertBox: err => setError(err)
    }
    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

Provider.propTypes = {
    children: PropTypes.array || PropTypes.object
}
const useAuth = () => useContext(Context)

export { Provider as default, useAuth }
