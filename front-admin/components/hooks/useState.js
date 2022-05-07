import { useEffect, useState } from 'react'

export const useSetState = initialState => {
  const [state, setState] = useState(initialState)
  const increase = () => {return setState(state + 1)}
  const decrease = () => {return setState(state - 1)}
  const reset = () => {return setState(0)}
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (state === -1) return reset()
  }, [state])
  // Cambio de estado
  const changeState = () => {
    setState(!state)
  }
  return {
    state,
    increase,
    decrease,
    reset,
    changeState,
    setState
  }
}
