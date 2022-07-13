import employeesModel from '../../models/Store/employees'
import { deCode, getAttributes } from '../../utils/util'

export const createEmployee = async (_, { input }, ctx) => {
  try {
    await employeesModel.create({ ...input, idStore: deCode(ctx.restaurant) })
    return {
      success: true,
      message: 'creada'
    }
  } catch (error) {
    console.log("🚀 ~ file: employee.js ~ line 12 ~ createEmployee ~ error", error)
    return { success: false, message: error }
  }
}

export const employees = async (_, args, ctx, info) => {
  const attributes = getAttributes(employeesModel, info)
  return await employeesModel.findAll({
    attributes,
    where: { idStore: deCode('MjcyMDg4ODE0ODUxNTE2NDUw' || ctx.restaurant) }
  })
}


export default {
  TYPES: {
  },
  QUERIES: {
    employees
  },
  MUTATIONS: {
    createEmployee
  }
}
