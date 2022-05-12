/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from 'apollo-server-micro'
import CatStore from '../../models/information/CategorieStore'
import CitiesModel from '../../models/information/CitiesModel'
import colorModel from '../../models/information/color'
import CountriesModel from '../../models/information/CountriesModel'
import DepartmentsModel from '../../models/information/DepartmentsModel'
import SizeModel from '../../models/information/size'
import TypeIdentitiesModel from '../../models/information/TypeIdentitiesModel'
import TypeRoad from '../../models/information/TypeOfRoad'
import { deCode, filterKeyObject, getAttributes } from '../../utils/util'
import { Op } from 'sequelize'

// cities
export const getCities = async (_root, _args, _context, info) => {
  try {
    const attributes = getAttributes(CitiesModel, info)
    const data = await CitiesModel.findAll({ attributes, where: { cState: { [Op.gt]: 0 } }, order: [['cName', 'DESC']] })
    return data
  } catch (e) {
    throw ApolloError('Lo sentimos, ha ocurrido un error interno')
  }
}
export const createCity = async (_root, { input }) => {
  const { cName, dId } = input
  try {
    const data = await CitiesModel.create({ cName, dId: deCode(dId), cState: 1 })
    return data
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}
export const cities = async (_root, { dId }, _context, info) => {
  try {
    const attributes = getAttributes(CitiesModel, info)
    const data = await CitiesModel.findAll({ attributes, where: { dId: deCode(dId), cState: { [Op.gt]: 0 } }, order: [['cName', 'ASC']] })
    return data
  } catch (e) {
    throw new ApolloError('Lo sentimos, ha ocurrido un error interno')
  }
}
// countries

export const countries = async (_root, _args, _context, info) => {
  try {
    const attributes = getAttributes(CountriesModel, info)
    const data = await CountriesModel.findAll({ attributes, where: { cState: { [Op.gt]: 0 } } })
    return data
  } catch (e) {
    throw ApolloError('Lo sentimos, ha ocurrido un error interno')
  }
}
export const createCountry = async (_root, { input }) => {
  try {
    const data = await CountriesModel.create({ ...input, cState: 1 })
    return data
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}
// departments
export const departments = async (_root, { cId }, _context, info) => {
  try {
    const attributes = getAttributes(DepartmentsModel, info)
    const data = await DepartmentsModel.findAll({ attributes, where: { cId: deCode(cId), dState: { [Op.gt]: 0 } }, order: [['dName', 'ASC']] })
    return data
  } catch (e) {
    throw new ApolloError('Lo sentimos, ha ocurrido un error interno')
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const department = async (_root, _context, info) => {
  try {
    const data = await DepartmentsModel.findAll({
      attributes: [
        'dId',
        'dName',
        'dState'
      ],
      order: [['dName', 'DESC']]
    })
    return data
  } catch (e) {
    throw new ApolloError('Lo sentimos, ha ocurrido un error interno')
  }
}
export const createDepartments = async (_root, { input }) => {
  const { dName, cId } = input
  try {
    const data = await DepartmentsModel.create({ dName, cId: deCode(cId), dState: 1 })
    return data
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}
export const road = async (_root, args, { input }, info) => {
  try {
    const attributes = getAttributes(TypeRoad, info)
    const data = await TypeRoad.findAll({ attributes, where: { rState: { [Op.gt]: 0 } }, order: [['rName', 'DESC']] })
    return data

  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}
export const createRoad = async (_root, { input }) => {
  try {
    const data = await TypeRoad.create({ ...input })
    return data
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}
// eslint-disable-next-line consistent-return
export const editRoad = async (_root, { input }) => {
  const { rId } = input || {}
  try {
    /** Editar el registro del país */
    // eslint-disable-next-line no-undef
    const data = await TypeRoad.update({ rName, rState }, { where: { rId: deCode(rId) } })
    const result = await TypeRoad.findOne({ ...filterKeyObject(input, ['rId']) }, { where: { rId: deCode(rId) } })
    if (data !== null) return result
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}
// getSizes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSizes = async (_root, _context, _info) => {
  try {
    const data = await SizeModel.findAll({ attributes: ['sizeId', 'sizeName', 'sizeState'] })
    return data
  } catch (e) {
    throw new ApolloError('Lo sentimos, ha ocurrido un error interno')
  }
}

export const create = async (_root, { input }, _context, _info) => {
  try {
    const res = await SizeModel.create({ ...input })
    return res
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}
// typeIdentities
export const typeIdentities = async (_root, { input }, _context, info) => {
  try {
    const attributes = getAttributes(TypeIdentitiesModel, info)
    const data = await TypeIdentitiesModel.findAll({ attributes, where: { tiState: { [Op.gt]: 0 } } })
    return data
  } catch (e) {
    throw new ApolloError('Lo sentimos, ha ocurrido un error interno')
  }
}
export const createTypeIdentity = async (_root, { input }, _context, _info) => {
  try {
    const data = await TypeIdentitiesModel.create({ ...input })
    return data
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}
export const getAllColor = async (_root, { input }, _context, info) => {
  const { colorId } = input || {}
  try {
    const attributes = getAttributes(colorModel, info)
    const data = await colorModel.findAll({
      attributes,
      where: {
        colorState: { [Op.gt]: 0 }, colorId: colorId ? deCode(colorId) : { [Op.gt]: 0 }
      }
    })
    return data
  } catch (e) {
    throw new ApolloError('Lo sentimos, ha ocurrido un error interno')
  }
}
export const createColor = async (_root, { input }, _context, _info) => {
  try {
    const res = await colorModel.create({ ...input })
    return res
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}
export const registerCategoryStore = async (_root, { input }, _context, _info) => {
  try {
    const res = await CatStore.create({ ...input })
    return res
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}
export const desCategoryStore = async (_root, { catStore, cState }, _context, _info) => {
  try {
    await CatStore.update({ cState: cState === 0 ? 1 : 0 }, { where: { catStore: deCode(catStore) } })
    return true
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}

export const getAllCatStore = async (_root, { input }, _context, info) => {
  try {
    const attributes = getAttributes(CatStore, info)
    const data = await CatStore.findAll({
      attributes
    })
    return data
  } catch (e) {
    // console.log(e)
    throw new ApolloError('Lo sentimos, ha ocurrido un error interno')
  }
}
export const getOneCatStore = async (_root, { catStore: idCat }, _context, info) => {
  if (!idCat) return new ApolloError('')
  try {
    const attributes = getAttributes(CatStore, info)
    const data = await CatStore.findOne({
      attributes,
      where: { catStore: idCat ? deCode(idCat) : {} }
    })
    return data
  } catch (e) {
    // console.log(e)
    throw new ApolloError(`${e}`, 'Lo sentimos, ha ocurrido un error interno')
  }
}
export const getOneCountry = async (_root, { cId }, _context, info) => {
  try {
    const attributes = getAttributes(CountriesModel, info)
    const data = await CountriesModel.findOne({ attributes, where: { cId: deCode(cId) } })
    return data
  } catch (e) {
    throw ApolloError('Lo sentimos, ha ocurrido un error interno')
  }

}
export const getOneDepartment = async (_root, { dId }, _context, info) => {
  try {
    const attributes = getAttributes(DepartmentsModel, info)
    const data = await DepartmentsModel.findOne({ attributes, where: { dId: deCode(dId) } })
    return data
  } catch (e) {
    throw ApolloError('Lo sentimos, ha ocurrido un error interno')
  }

}
export const getOneCities = async (_root, { ctId }, _context, info) => {
  try {
    const attributes = getAttributes(CitiesModel, info)
    const data = await CitiesModel.findOne({ attributes, where: { ctId: deCode(ctId) } })
    return data
  } catch (e) {
    throw ApolloError('Lo sentimos, ha ocurrido un error interno')
  }

}
export default {
  TYPES: {

  },
  QUERIES: {
    getCities,
    cities,
    // countries
    countries,
    getOneCountry,
    getOneCities,
    // depart
    departments,
    department,
    getOneDepartment,
    // road
    road,
    // sizes,
    getSizes,
    getOneCatStore,
    typeIdentities,
    getAllColor,
    getAllCatStore
  },
  MUTATIONS: {
    createCity,
    // countries
    createCountry,
    // departments,
    createDepartments,
    // road,
    createRoad,
    desCategoryStore,
    editRoad,
    create,
    createTypeIdentity,
    createColor,
    registerCategoryStore
  }
}
