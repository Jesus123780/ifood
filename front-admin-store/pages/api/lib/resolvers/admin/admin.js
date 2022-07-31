import { Op } from 'sequelize'
import Store from '../../models/Store/Store'
import Users from '../../models/Users'

/**
 * 
 * @param {*} _root no usado 
 * @param {*} param1 _
 * @param {*} _context context info global
 * @param {*} _info _
 * @returns 
 */

// eslint-disable-next-line
export const getAllStoreAdminReport = async (_root, _args, _context, _info) => {
  try {
    const { count: countInActive, rows: RowInActive } = await Store.findAndCountAll({
      where: {
        uState: {
          [Op.like]: 1
        }
      }
      // offset: 10,
      // limit: 2
    })
    const { count, rows } = await Store.findAndCountAll({
      where: {
        uState: {
          [Op.like]: 2
        }
      }
      // offset: 10,
      // limit: 2
    })
    return {
      store: rows,
      inActiveStore: RowInActive,
      countInActive: countInActive,
      count: count
    }
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno', e, 400)
    return error
  }

}
// eslint-disable-next-line
export const getAllUserActives = async (_root, _args, _context, _info) => {
  try {
    const { count, rows } = await Users.findAndCountAll({
      // where: {
      //   title: {
      //     [Op.like]: 'foo%'
      //   }
      // },
      // offset: 10,
      // limit: 2
    })
    const { count: countInActive, rows: RowInActive } = await Users.findAndCountAll({
      where: {
        uState: {
          [Op.like]: 0
        }
      }
      // offset: 10,
      // limit: 2
    })
    return {
      count: count,
      countInActive: countInActive,
      users: rows,
      usersInActives: RowInActive
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
    getAllStoreAdminReport,
    getAllUserActives
  },
  MUTATIONS: {
  }
}
