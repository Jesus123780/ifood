/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { ApolloError } from 'apollo-server-micro'
import EmployeesModelStore from '../../models/employees/EmployeesStore'
import Users from '../../models/Users'
import { LoginEmail } from '../../templates/LoginEmail'
import { generateCode, generateToken, sendEmail } from '../../utils'
import { deCode, getAttributes } from '../../utils/util'
import { Op } from 'sequelize'

export const createOneEmployeeStore = async (_root, { input }, context) => {
  try {
    const { idEmployee, eState, uEmail } = input || {}
    const dataObjUserEmployee = {
      idEmployee,
      eState,
      MyEmail: uEmail,
      idUser: context.User.id,
      restaurant: context.restaurant
    }
    const uToken = await generateCode()
    const token = await generateToken(dataObjUserEmployee)
    const exist = await EmployeesModelStore.findOne({
      attributes: ['id'],
      where: {
        [Op.or]: [
          { idEmployee: deCode(idEmployee) }
        ]
      }
    })
    if (exist) return new ApolloError('El usuario ya existe', 409)
    await EmployeesModelStore.create({ ...input, id: deCode(context.User.id), idEmployee: deCode(idEmployee), idStore: deCode(context.restaurant) })
    sendEmail({
      from: 'juvi69elpapu@gmail.com',
      to: uEmail,
      text: 'Invitation.',
      subject: 'Invitation.',
      html: LoginEmail({
        code: uToken,
        or_JWT_Token: token
      })
    }).then(res => {return console.log(res, 'the res')}).catch(err => {return console.log(err, 'the err')})
    return { success: true, message: 'Update' }
  } catch (e) {
    const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
    return error
  }
}
/**
 * 
 * @param {*} _root 
 * @param {*} param1 
 * @param {*} context 
 * @returns 
 */
export const employees = async (_root, { max, min }, context, info) => {
  try {
    const attributes = getAttributes(EmployeesModelStore, info)
    let whereSearch = {}
    const data = await EmployeesModelStore.findAll({

      attributes,
      where: {
        ...whereSearch,
        idStore: deCode(context.restaurant)
      }, limit: [min || 0, max || 100], order: [['eDatCre', 'ASC']]
    })
    return data
  } catch (e) {
    console.log(e)
  }
}
export const createOneEmployeeStoreAndUser = async (_root, { input }, context) => {
  console.log(input, 'heheheh')
  try {
    const { idEmployee, eState, uEmail } = input || {}
    const dataObjUserEmployee = {
      idEmployee,
      eState,
      MyEmail: uEmail,
      idUser: context.User.id,
      restaurant: context.restaurant
    }
    const uToken = await generateCode()
    const token = await generateToken(dataObjUserEmployee)
    const exist = await Users.findOne({
      attributes: ['id', 'email'],
      where: {
        [Op.or]: [
          { email: uEmail }
        ]
      }
    })
    if (exist) {
      sendEmail({
        from: 'juvi69elpapu@gmail.com',
        to: uEmail,
        text: 'Invitation.',
        subject: 'Invitation.',
        html: LoginEmail({
          code: uToken,
          or_JWT_Token: token
        })
      }).then(res => {return console.log(res, 'the res')}).catch(err => {return console.log(err, 'the err')})
    } else {
      await Users.create({ email: uEmail, password: uToken, uState: 1, username: uEmail })
    }

    sendEmail({
      from: 'juvi69elpapu@gmail.com',
      to: uEmail,
      text: 'Invitation.',
      subject: 'Invitation.',
      html: LoginEmail({
        code: uToken,
        or_JWT_Token: token
      })
    }).then(res => {return console.log(res, 'the res')}).catch(err => {return console.log(err, 'the err')})

    return { success: true, message: 'Update' }
  } catch (e) {
    const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
    return error
  }
}
export default {
  TYPES: {
  },
  QUERIES: {
    employees
  },
  MUTATIONS: {
    createOneEmployeeStore,
    createOneEmployeeStoreAndUser
  }
}
