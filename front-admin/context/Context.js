import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
export const Context = createContext()
const Provider = ({ children }) => {
  // STATE
  const [error, setError] = useState({})
  // State to Session
  const [isCompany, setCompany] = useState({})
  // Effects para el Toast
  useEffect(() => {
    !!error?.message &&
            setTimeout(() => {return setError('')}, error.duration || 7000)
  }, [error])
  const [collapsed, setCollapsed] = useState(false)
  // Context to setCompanyLink
  const DataCompany = useMemo(
    () => {return {
      isCompany
    }},
    [isCompany]
  )
  const setCompanyLink = useCallback(
    sessionValue => {return setCompany(sessionValue)},
    []
  )
  useEffect(() => { }, [isCompany])
  // Verify state
  const [menu, setMenu] = useState(0)
  const [countPedido, setCountPedido] = useState(0)
  const handleMenu = index => {return setMenu(index === menu ? false : index)}
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
  const [salesOpen, setSalesOpen] = useState(false)
  const setSessionActive = useCallback(
    sessionValue => {return setIsSession(sessionValue)},
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
    () => {return {
      isSession
    }},
    [isSession]
  )
  const [alert] = useState(false)
  const initialState = {
    PRODUCT: []
  }
  const product = (state, action) => {
    //   ADD TO CARD
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'))
    switch (action.type) {
      case 'ADD_PRODUCT':
        localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCart, ...state?.PRODUCT }))
        return {
          ...state,
          // eslint-disable-next-line no-unsafe-optional-chaining
          PRODUCT: [...state?.PRODUCT, action?.payload]

        }
      case 'REMOVE_PRODUCT':
        return {
          PRODUCT: state?.PRODUCT?.filter((t, idx) => {return idx !== action?.idx})
        }
      case 'REMOVE_ALL':
        return {
          PRODUCT: []
        }
      case 'TOGGLE_INVOICE':
        return {
          PRODUCT: state?.PRODUCT.map((t, idx) => {return idx === action.idx ? { ...t, isPaid: !t.isPaid } : t})
        }
      default:
        return state
    }
  }
  const [state_product_card, dispatch] = useReducer(product, initialState)
  const [openSchedule, setOpenSchedule] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [selectedStore, setSelectedStore] = useState(null)
  const setStoreChatActive = useCallback(sessionValue => {
    setSelectedStore(sessionValue)
  },
  [selectedStore, hidden]
  )
  const value = useMemo(
    () => {return {
      error,
      hidden,
      setSelectedStore,
      setOpenSchedule,
      setSalesOpen,
      salesOpen,
      openSchedule,
      setHidden,
      selectedStore,
      setStoreChatActive,
      DataCompany,
      // Link
      setCompanyLink,
      setCollapsed,
      setCountPedido,
      countPedido,
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
      // add products
      state_product_card,
      dispatch,
      setAlertBox: err => {return setError(err)}
    }},
    [
      error,
      hidden,
      setSelectedStore,
      setOpenSchedule,
      openSchedule,
      setHidden,
      selectedStore,
      setStoreChatActive,
      DataCompany, 
      setSalesOpen,
      // Link
      setCompanyLink,
      setCollapsed,
      setCountPedido,
      countPedido,
      isCompany,
      handleMenu,
      salesOpen,
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
      dispatch
    ]
  )

  return <Context.Provider value={value}>
    {children}
  </Context.Provider>
}
const useAuth = () => {return useContext(Context)}

export { Provider as default, useAuth }
