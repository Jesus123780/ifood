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
    const [isCompany, setCompany] = useState({})
    // Effects para el Toast
    useEffect(() => {
        !!error?.message &&
      setTimeout(() => setError(''), error.duration || 7000)
    }, [error])
    const [collapsed, setCollapsed] = useState(false)
    // Context to setCompanyLink
    const DataCompany = useMemo(
        () => ({
            isCompany
        }),
        [isCompany]
    )
    const setCompanyLink = useCallback(
        sessionValue => setCompany(sessionValue),
        []
    )
    useEffect(() => { }, [isCompany])
    // Verify state
    const [menu, setMenu] = useState(0)
    const handleMenu = index => setMenu(index === menu ? false : index)
    const initialCompanyState = {
        idLasComp: undefined
    }
    // Context LastCompany
    const [company, setCompanyId] = useState(initialCompanyState)
    const useCompany = idLasComp => {
        setCompanyId({
            ...company,
            idLasComp
        })
        if (typeof idLasComp !== 'undefined') {
            localStorage.setItem('idLasComp', idLasComp)
        }
    }
    useEffect(() => {
        if (localStorage.getItem('idLasComp') !== company.idLasComp) {
            setCompanyId({
                ...company,
                idLasComp: localStorage.getItem('idLasComp')
            })
        }
    }, [company])

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
    // useEffect(() => {
    //     if (['/teams/invite/[id]'].find(x => x !== router.pathname)) {
    //         if (!localStorage.getItem('idLasComp')) {
    //             router.push('/switch-options')
    //             setTimeout(() => {
    //                 setAlert(true)
    //             }, 2000);
    //         } else {
    //             setAlert(false)
    //         }
    //     }
    //     setAlert(false)
    // }, [authData, company])
    // const value = {
    //     error,
    //     DataCompany,
    //     // Link
    //     setCompanyLink,
    //     setCollapsed,
    //     isCompany,
    //     handleMenu,
    //     // Menu Ctx
    //     menu,
    //     collapsed,
    //     isSession,
    //     setIsSession,
    //     // State login
    //     authData,
    //     setSessionActive,
    //     // UseCompany
    //     useCompany,
    //     company,
    //     // setAlertBox
    //     alert,
    //     setAlertBox: err => setError(err)
    // }
    const value = useMemo(
        () => ({
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
            useCompany,
            company,
            // setAlertBox
            alert,
            setAlertBox: err => setError(err)
        }),
        [isSession]
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
