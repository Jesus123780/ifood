import { useCallback, useState } from 'react'

/**
 * Hook for managing multiple checkbox states
 *
 * @param {Array<String | Number>} elem - list of all elem
 * @param {Array<String | Number>} selectedIds - list of selected elem (optional)
 *
 * @returns {Object}
 *  - checkboxStates (state object),
 *  - numSelectedItems (number),
 *  - handleChangeCheck (callback),
 *  - toggleAll (callback),
 *  - selectAll (callback),
 *  - clearAll (callback)
 */

export const useCheckboxState = (elem, selectedIds = [], disabledIds = []) => {
  const numTotalItems = elem?.length
  const [checkedItems, setCheckedItems] = useState(new Set(selectedIds))
  const [disabledItems, setDisabledItems] = useState(new Set(disabledIds))

  const handleChangeCheck = useCallback((event, id) => {
    const target = event.target
    setCheckedItems(prevState => { 

      const newState = new Set(prevState)
      if (target.checked) {
        newState.add(id)
      } else {
        newState.delete(id)
      }
      return newState
    })
  }, [])

  const setAll = useCallback(
    isChecked => {
      setCheckedItems(prevState => {
        const newState = new Set(prevState)
        for (const id of elem) {
          if (disabledItems.has(id)) {
            continue
          }
          if (isChecked) {
            newState.add(id)
          } else {
            newState.delete(id)
          }
        }
        return newState
      })
    },
    [elem, disabledItems]
  )

  const selectAll = useCallback(() => {
    if (checkedItems.size === numTotalItems) {
      return
    }
    setAll(true)
  }, [checkedItems, numTotalItems, setAll])

  const clearAll = useCallback(() => {
    if (checkedItems.size === 0) {
      return
    }
    setAll(false)
  }, [checkedItems, setAll])

  const toggleAll = useCallback(() => {
    const numDisabledAndChecked = [...disabledItems].reduce((count, id) => {
      if (checkedItems.has(id)) {
        return count + 1
      }
      return count
    }, 0)
    if (checkedItems.size - numDisabledAndChecked === 0) {
      selectAll()
    } else {
      clearAll()
    }
  }, [checkedItems, disabledItems, selectAll, clearAll])

  const enableCheckboxes = useCallback((...elem) => {
    setDisabledItems(prevState => {
      const newState = new Set(prevState)
      for (const id of elem) {
        newState.delete(id)
      }
      return newState
    })
  }, [])

  const disableCheckboxes = useCallback((...elem) => {
    setDisabledItems(prevState => {
      const newState = new Set(prevState)
      for (const id of elem) {
        newState.add(id)
      }
      return newState
    })
  }, [])

  return {
    checkedItems,
    disabledItems,
    handleChangeCheck,
    toggleAll,
    selectAll,
    clearAll,
    enableCheckboxes,
    disableCheckboxes
  }
}
