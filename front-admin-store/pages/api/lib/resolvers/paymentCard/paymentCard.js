/* eslint-disable no-unused-vars */
import PaymentCard from '../../models/Store/paymentcard'
import PaymentCardType from '../../models/userMaster/paymentcardTypes'
import { deCode } from '../../utils'
import { getAttributes } from '../../utils/util'

/**
 * 
 * @param {*} _root no usado 
 * @param {*} param1 _
 * @param {*} context context info global
 * @param {*} info _
 * @returns 
 */
//  eslint-disable-next-line
export const registerPaymentCardType = async (_root, { input }, context, info) => {
  const { typeCardName } = input || {}
  try {
    const data = await PaymentCardType.create({
      typeCardName
    })
    return data
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno', e, 400)
    return error
  }

}
export const getAllPaymentCardType = async (_root, args, context, info) => {
  try {
    const attributes = getAttributes(PaymentCardType, info)
    const data = await PaymentCardType.findAll({ attributes })
    return data
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno', e, 400)
    return error
  }

}


// USER STORE
export const registerPaymentCard = async (_root, { input }, context) => {
  const { id, idStore } = input || {}
  try {
    const data = await PaymentCard.create({
      id: deCode(context.User.id || id),
      idStore: idStore ? deCode(idStore) : deCode(context.restaurant),
      ...input
    })
    return data
  } catch (e) {
    const error = new Error('No pudimos guardar la tarjeta', e, 400)
    return error
  }

}
export const deletePaymentCardType = async (_root, { cardtypeId }, context) => {
  try {
    const isExist = await PaymentCardType.findOne({
      attributes: ['cardtypeId'],
      where: { cardtypeId: deCode(cardtypeId) }
    })
    console.log(isExist)
    if (isExist === null) {
      return {
        success: false,
        message: 'La tarjeta no existe'
      }
    } else {
      PaymentCardType.destroy({ where: { cardtypeId: deCode(cardtypeId) } })
      return {
        success: true,
        message: 'Tarjeta eliminada con éxito'
      }
    }
  } catch (e) {
    return {
      success: false,
      message:  `No pudimos eliminar la tarjeta', ${e}, ${400}`
    }
  }

}

export default {
  TYPES: {
  },
  QUERIES: {
    getAllPaymentCardType
  },
  MUTATIONS: {
    deletePaymentCardType,
    registerPaymentCard,
    registerPaymentCardType,
  }
}
