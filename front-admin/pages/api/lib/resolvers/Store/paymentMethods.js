/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import promosStoreAdmin from '../../models/Store/promosStoreAdmin'
import { getAttributes } from '../../utils/util'
import { Op } from 'sequelize'
import { AuthenticationError } from 'apollo-server-core'

export const registerPaymentMethods = async (_, args, ctx, info) => {
  if (!ctx.User.id) return AuthenticationError('Inicie session')
  try {
    console.log('new')
  } catch (error) {
    return new Error('Ocurrió un error al registrar una tarjeta') 
  }
}

export default {
  TYPES: {
  },
  QUERIES: {
  },
  MUTATIONS: {
    registerPaymentMethods
  }
}
