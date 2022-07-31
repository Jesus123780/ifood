const addButtonValues = (values, max) => {
  const value1 = values.splice(Math.floor(Math.random() * (max - 0)) + 0, 1)
  return { max: max - 2, values: [value1] }
}

export const generateNumberArray = () => {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let max = 9
  const buttons = Array.from(Array(10)).map(() => {
    return Array.from(Array(1)).map(() => {
      const buttonValues = addButtonValues(values, max)
      max = buttonValues.max
      return buttonValues.values
    })
  })
  return buttons
}
