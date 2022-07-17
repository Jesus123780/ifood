import employeesModel from '../../models/Store/employees'
import { deCode, getAttributes } from '../../utils/util'

export const createEmployee = async (_, { input }, ctx) => {
  try {
    const exist = await employeesModel.findOne({ where: { tpNumDoc: input.tpNumDoc, idStore: deCode(ctx.restaurant) } })
    if (exist) {
      return {
        success: false,
        message: 'el numero de documento ya se encuentra registrado'
      }
    }
    await employeesModel.create({ ...input, idStore: deCode(ctx.restaurant) })
    return {
      success: true,
      message: 'creada'
    }
  } catch (error) {
    return { success: false, message: error }
  }
}

export const employees = async (_, args, ctx, info) => {
  try {
    const attributes = getAttributes(employeesModel, info)
    return await employeesModel.findAll({
      attributes,
      where: { idStore: deCode(ctx.restaurant) }
    })
  } catch (error) {
    throw new Error(error)
  }
}
export const employeeStore = async (_, args, ctx, info) => {
  const { eId } = args || {}
  try {
    const attributes = getAttributes(employeesModel, info)
    return await employeesModel.findOne({
      attributes,
      where: {
        eId: deCode(eId),
        idStore: deCode(ctx.restaurant)
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteEmployeeStore = async (_, args, ctx, _info) => {
  const { eId } = args || {}
  try {
    await employeesModel.destroy({
      where: {
        eId: deCode(eId),
        idStore: deCode(ctx.restaurant)
      }
    }) 
    return {
      success: true,
      message: 'eliminado'
    }
  } catch (error) {
    return {
      success: false,
      message: 'No se pudo eliminar'
    }
  }
}


export default {
  TYPES: {
  },
  QUERIES: {
    employees,
    employeeStore
  },
  MUTATIONS: {
    createEmployee,
    deleteEmployeeStore
  }
}
