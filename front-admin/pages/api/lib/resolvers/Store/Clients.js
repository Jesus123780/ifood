import { ApolloError } from 'apollo-server-micro'
import clients from '../../models/Store/clients'
import { deCode, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const createClients = async (_root, { input }, context, _info) => {

  const { idUser, ccClient, clientNumber } = input || {}
  try {
    const isExist = await clients.findOne({
      attributes: ['clientNumber', 'ccClient'],
      where: { ccClient }
    })
    if (!isExist) {
      const data = await clients.create({ ...input, idStore: deCode(context.restaurant), idUser: idUser ? deCode(idUser) : null })
      return data
    } 
    const error = new ApolloError('El numero de identificación ya existe')
    return error
        
  } catch (e) {
  }
  // try {
  //     const [exist, created] = await clients.findOrCreate({
  //         where: {
  //             clientNumber: clientNumber,
  //             ccClient: ccClient
  //         },
  //         defaults: {
  //             ...input,
  //             idUser: deCode(idUser),
  //             idStore: deCode('MjcyMDg4ODE0ODUxNTE2NDUw')
  //         }
  //     })
  //     return created
  // } catch (e) {
  //     const error = new Error('Lo sentimos, ha ocurrido un error interno')
  //     return error
  // }
}
export const getOneClients = async (_root, { cliId }, context, info) => {
  const attributes = getAttributes(clients, info)
  const data = await clients.findOne({
    attributes,
    where: { cliId: deCode(cliId) }
  })
  return data

}
// idStore: ID, cId: ID dId: ID ctId: ID search: String min: Int fromDate: DateTime toDate: DateTime max: Int
export const getAllClients = async (_root, { idStore, cId, dId, ctId, search, min, max, fromDate, toDate }, context, info) => {
  console.log(fromDate, toDate)
  try {
    const attributes = getAttributes(clients, info)
    const data = await clients.findAll({
      attributes, where: {
        [Op.or]: [
          {
            ...((fromDate && toDate) ? { createAt: { [Op.between]: [fromDate, `${toDate} 23:59:59`] } } : {}),
            idStore: idStore ? deCode(idStore) : deCode(context.restaurant),
            clState: { [Op.gt]: 0 }
          }
        ]
      }, order: [['createAt', 'DESC']]
    })
    return data
  } catch (e) {
    console.log(e)
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)

  }
}
export const deleteClient = async (_root, { cliId, clState }, context, info) => {
  try {
    await clients.update({ clState: clState === 1 ? 0 : 1 }, { where: { cliId: deCode(cliId) } })
  } catch (error) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500)

  }
}
export default {
  TYPES: {
  },
  QUERIES: {
    getAllClients,
    getOneClients
  },
  MUTATIONS: {
    createClients,
    deleteClient
  }
}
