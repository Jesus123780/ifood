import banners from '../../models/banners/banners'
import { deCode, enCode, getAttributes } from '../../utils/util'
import fs from 'fs'
import { ApolloError } from 'apollo-server-express'
import { URL_BASE } from '../../utils'
import bannerspromo from '../../models/bannerspromo/bannerspromo'
const { Op } = require('sequelize')

export const getAllMasterBanners = async (_, { min, max, search }, ctx, info) => {
    const attributes = getAttributes(banners, info)
    const data = await banners.findAll({
        attributes,
        where: {
            [Op.or]: [
                {
                    BannersState: { [Op.gt]: 0 }
                }
            ]
        }, limit: [min || 0, max || 100], order: [['BannersState', 'ASC']]
    })
    return data
}
export const getAllPromoBanners = async (_, { min, max, search }, ctx, info) => {
    const attributes = getAttributes(banners, info)
    const data = await bannerspromo.findAll({
        attributes,
        where: {
            [Op.or]: [
                {
                    bpState: { [Op.gt]: 0 }
                }
            ]
        }, limit: [min || 0, max || 100], order: [['bpState', 'ASC']]
    })
    return data
}
const saveImages = async ({ filename, mimetype, fileStream, state  }) => {
    const path = state === 2 ? `public/promo/${filename}` : `public/${filename}`
    await fileStream.pipe(fs.createWriteStream(path))
    return path
}

export const setBanners = async (_, { input }, ctx) => {

    try {
        const { description, image, name } = input
        const fileUpload = await image
        const { createReadStream, filename, mimetype, encoding } = fileUpload
        // const extFile = filename.substring(filename.lastIndexOf('.'), filename.length)
        const fileStream = createReadStream()
        const path = await saveImages({ filename, mimetype, fileStream })
        console.log(`${path}`)
        const data = await banners.create({ BannersState: 1, description, path: `${URL_BASE}static/${filename}`, name })
        return data
    
    } catch (error) {
        console.log(error)
        throw new ApolloError(error, 'No se pudo eliminar el producto debido a un error interno.')
    }


}
export const setPromoBanners = async (_, { input }, ctx) => {
    try {
        const { description, image, name } = input
        const fileUpload = await image
        const { createReadStream, filename, mimetype, encoding } = fileUpload
        console.log(input)
        // const extFile = filename.substring(filename.lastIndexOf('.'), filename.length)
        const fileStream = createReadStream()
        const path = await saveImages({ filename, mimetype, fileStream, state: 2 })
        console.log(`${path}`)
        const data = await bannerspromo.create({ bpState: 1, description, path: `${URL_BASE}static/promo/${filename}`, name })
        // return data
    
    } catch (error) {
        console.log(error)
        throw new ApolloError(error, 'No se pudo eliminar el producto debido a un error interno.')
    }


}
export default {
    TYPES: {
    },
    QUERIES: {
        getAllMasterBanners,
        getAllPromoBanners,
    },
    MUTATIONS: {
        setBanners,
        setPromoBanners,
    }
}
