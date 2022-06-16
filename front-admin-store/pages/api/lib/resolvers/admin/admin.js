import Store from '../../models/Store/Store'

/**
 * 
 * @param {*} _root no usado 
 * @param {*} param1 _
 * @param {*} context context info global
 * @param {*} info _
 * @returns 
 */
export const getAllStoreAdminReport = async (_root, _args, context, info) => {
  try {
    const { count, rows } = await Store.findAndCountAll({
      // where: {
      //   // title: {
      //   //   [Op.like]: 'foo%'
      //   // }
      // },
      // offset: 10,
      // limit: 2
    });
    return {
      store: rows,
      count: count
    }
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno', e, 400)
    return error
  }

}

export default {
  TYPES: {
  },
  QUERIES: {
    getAllStoreAdminReport
  },
  MUTATIONS: {
  }
}
