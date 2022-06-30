import employees from '../../models/Store/employees'
import { deCode } from '../../utils/util'

export const createEmployee = async (_, { input }, ctx) => {
  console.log('🚀 ~ file: employee.js ~ line 5 ~ createEmployee ~ input', input)
  try {
    await employees.create({ ...input, idStore: deCode('MjcyMDg4ODE0ODUxNTE2NDUw' || ctx.restaurant) })
    return {
      success: true,
      message: 'creada'
    }
  } catch (error) {
    return { success: false, message: error }
  }
}


export default {
  TYPES: {
  },
  QUERIES: {
  },
  MUTATIONS: {
    createEmployee
  }
}
