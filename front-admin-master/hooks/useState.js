import { useEffect, useState } from 'react'

export const useSetState = initialState => {
    const [state, setState] = useState(initialState)
    const increase = () => setState(state + 1)
    const decrease = () => setState(state - 1)
    const reset = () => setState(0)
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
