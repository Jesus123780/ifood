import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { useRouter } from 'next/router'
export const Context = createContext()
const Provider = ({ children }) => {
    // STATE
    const router = useRouter()
    const [error, setError] = useState({})
    // State to Session
    const [isLocation, setIsLocation] = useState()
    // Effects para el Toast
    useEffect(() => {
        !!error?.message &&
            setTimeout(() => setError(''), error.duration || 7000)
    }, [error])
    const [collapsed, setCollapsed] = useState(false)
    // Context to setLocationLink
    const DataLocation = useMemo(
        () => ({
            isLocation
        }),
        [isLocation]
    )
    const setLocationLink = useCallback(
        sessionValue => setLocation(sessionValue),
        []
    )
    // Verify state
    const [menu, setMenu] = useState(0)
    const [countPedido, setCountPedido] = useState(0)
    const handleMenu = index => setMenu(index === menu ? false : index)
    const initialLocationState = {
        countryId: undefined,
        department: undefined,
        city: undefined,

    }
    // Context LastLocation
    const [Location, setLocation] = useState(initialLocationState)
    const useUseLocation = (countryId, department, city) => {
        setLocation({
            ...Location,
            countryId,
            department,
            city
        })
        if (typeof countryId !== 'undefined') {
            localStorage.setItem('countryId', countryId)
        }
        if (typeof department !== 'undefined') {
            localStorage.setItem('department', department)
        }
        if (typeof city !== 'undefined') {
            localStorage.setItem('city', city)
        }
    }
    useEffect(() => {
        if (!Location && localStorage.getItem('countryId') !== Location.countryId || localStorage.getItem('department') !== Location.department || localStorage.getItem('city') !== Location.city) {
            setLocation({
                ...Location,
                countryId: localStorage.getItem('countryId'),
                department: localStorage.getItem('department'),
                city: localStorage.getItem('city')
            })
        }
    }, [Location])

    // Context to session
    const [isSession, setIsSession] = useState()
    const setSessionActive = useCallback(
        sessionValue => setIsSession(sessionValue),
        []
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
    const initialState = {
        PRODUCT: [],
    }
    const product = (state, action) => {
        //   ADD TO CARD
        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'))
        switch (action.type) {
            case 'ADD_PRODUCT':
                localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCart, ...state?.PRODUCT }))
                return {
                    ...state,
                    PRODUCT: [...state?.PRODUCT, action?.payload]

                }
            case 'REMOVE_PRODUCT':
                return {
                    PRODUCT: state?.PRODUCT?.filter((t, idx) => idx !== action?.idx)
                };
            case 'REMOVE_ALL':
                return {
                    PRODUCT: []
                };
            case "TOGGLE_INVOICE":
                return {
                    PRODUCT: state?.PRODUCT.map((t, idx) => idx === action.idx ? { ...t, isPaid: !t.isPaid } : t),
                };
            default:
                return state;
        }
    }
    const [state_product_card, dispatch] = useReducer(product, initialState)
    const [openSchedule, setOpenSchedule] = useState(true)
    const listRoutes = [
        {
          name: 'update/promos-dashboard'
        },
        {
          name: 'update/banners'
        },
        {
          name: 'update/notification'
        },
        {
          name: 'update/promos'
        },
        {
          name: 'update/stores'
        },
        {
          name: 'update/Pqr'
        },
        {
          name: 'update/categories'
        },
        {
          name: 'update/offers'
        },
        {
          name: 'update/kit'
        },
        {
          name: 'actividad'
        },
      ]
    const value = {
        error,
        setOpenSchedule,
        openSchedule,
        DataLocation,
        // Link
        setLocationLink,
        setCollapsed,
        setCountPedido,
        countPedido,
        isLocation,
        listRoutes,
        handleMenu,
        // Menu Ctx
        menu,
        collapsed,
        isSession,
        setIsSession,
        // State login
        authData,
        setSessionActive,
        // useUseLocation
        useUseLocation,
        Location,
        // setAlertBox
        alert,
        // add products
        state_product_card,
        dispatch,
        setAlertBox: err => setError(err)
    }
    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}
const useAuth = () => useContext(Context)

export { Provider as default, useAuth }
