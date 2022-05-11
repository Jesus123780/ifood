import banners from '../../models/banners/banners'
import { deCode, enCode, getAttributes } from '../../utils/util'
import fs from 'fs'
import { ApolloError } from 'apollo-server-express'
import { URL_BASE } from '../../utils'
import bannerspromo from '../../models/bannerspromo/bannerspromo'
import { unlink } from 'fs/promises';
import { unlinkSync } from 'fs';
import { Op } from 'sequelize'
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
    const attributes = getAttributes(bannerspromo, info)
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
export const deleteOneBannerPromo = async (_, { bpId, bpState }, ctx, info) => {
    try {
        
        await bannerspromo.update({ bpState: bpState === 1 ? 0 : 1 }, { where: { bpId: deCode(bpId) } })
        return { success: true, message: 'Banner Eliminado' }
    } catch (error) {
        return { success: false, message: `${error}, Error interno` }

    }
}
export const deleteOneBannerMaster = async (_, { BannerId, BannersState, path }, ctx, info) => {
    // console.log(path)
    // try {
    //     unlinkSync('public/Bannerlista2_zsVI.png');
    //     // console.log('successfully deleted /tmp/hello');
    //   } catch (err) {
    //       console.log(err)
    //     // handle the error
    //   };
    // // var filePath = 'c:/book/discovery.docx';
    // // fs.unlinkSync(path);
    try {
        await banners.update({ BannersState: BannersState === 1 ? 0 : 1 }, { where: { BannerId: deCode(BannerId) } })
        return { success: true, message: 'Banner Eliminado' }
    } catch (error) {
        return { success: false, message: `${error}, Error interno` }

    }
}
export const saveImages = async ({ filename, mimetype, fileStream, state }) => {
    let nameFile =  filename.replace(/\s+/g, '')
    try {
        const path = state === 2 ? `public/promo/${nameFile}` : state === 3 ? `public/logo/${nameFile}` : state === 4 ? `public/banner/${nameFile}` : `public/${nameFile}`
        await fileStream.pipe(fs.createWriteStream(path))
        return path
    } catch (error) {
        throw ApolloError('Lo sentimos, ha ocurrido un error interno', error)
    }

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
        deleteOneBannerMaster,
        deleteOneBannerPromo,
    }
}
