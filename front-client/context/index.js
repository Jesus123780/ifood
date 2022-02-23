import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
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
    const [itemProducts, setCountItemProduct] = useState(0)
    const handleMenu = index => setMenu(index === menu ? false : index)
    const initialCompanyState = {
        idStore: undefined
    }
    // Context LastCompany
    const [company, setCompanyId] = useState(initialCompanyState)
    const useCompany = idStore => {
        setCompanyId({
            ...company,
            idStore
        })
        if (typeof idStore !== 'undefined') {
            localStorage.setItem('idStore', idStore)
        }
    }
    useEffect(() => {
        if (localStorage.getItem('idStore') !== company.idStore) {
            setCompanyId({
                ...company,
                idStore: localStorage.getItem('idStore')
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
    const [modalLocation, setModalLocation] = useState(false)
    const [locationStr, setLocationString] = useState('')
    useEffect(() => {
        let location = localStorage.getItem('location.data')
        if (!location) {
            setModalLocation(true)
        }
    }, [locationStr, modalLocation])
    // HEADER PRODUCTS STORE
    const initialState2 = {
        containerRef: null,
        stickyRefs: new Map(),
        debug: false
    };
    // No operation
    const noop = () => { };

    const initialDispatch = {
        setContainerRef: noop,
        addStickyRef: noop
    };

    const StickyStateContext = createContext(initialState2);
    const StickyDispatchContext = createContext(initialDispatch);
    const ActionType = {
        setContainerRef: "set container ref",
        addStickyRef: "add sticky ref",
        toggleDebug: "toggle debug"
    };
    function reducer(state, action) {
        const { type, payload } = action;
        switch (type) {
            case ActionType.setContainerRef:
                // Reassigning a new ref, will infinitely re-load!
                return Object.assign(state, {
                    containerRef: { current: payload.containerRef }
                });
            case ActionType.addStickyRef:
                const { topSentinelRef, bottomSentinelRef, stickyRef } = payload;

                state.stickyRefs.set(topSentinelRef.current, stickyRef);
                state.stickyRefs.set(bottomSentinelRef.current, stickyRef);

                return Object.assign(state, {
                    stickyRefs: state.stickyRefs
                });
            case ActionType.toggleDebug:
                return { ...state, debug: !state.debug };
            default:
                return state;
        }
    }

    function StickyProvider({ children }) {
        const [state, dispatch] = useReducer(reducer, initialState);

        const setContainerRef = containerRef =>
            dispatch({ type: ActionType.setContainerRef, payload: { containerRef } });

        const addStickyRef = (topSentinelRef, bottomSentinelRef, stickyRef) =>
            dispatch({
                type: ActionType.addStickyRef,
                payload: { topSentinelRef, bottomSentinelRef, stickyRef }
            });

        const toggleDebug = () => dispatch({ type: ActionType.toggleDebug });

        const actions = {
            setContainerRef,
            addStickyRef,
            toggleDebug
        };

        return (
            <StickyStateContext.Provider value={state}>
                <StickyDispatchContext.Provider value={actions}>
                    {children}
                </StickyDispatchContext.Provider>
            </StickyStateContext.Provider>
        );
    }
    const value = {
        error,
        DataCompany,
        modalLocation,
        setModalLocation,
        locationStr,
        setLocationString,
        // Link
        setCompanyLink,
        setCollapsed,
        isCompany,
        handleMenu,
        // cuenta los productos
        setCountItemProduct,
        itemProducts,
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
        // add products
        state_product_card,
        dispatch,
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
