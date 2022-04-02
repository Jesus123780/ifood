import banners from '../../models/banners/banners'
import { deCode, enCode, getAttributes } from '../../utils/util'
import { URL_BASE } from '../../utils'
import bannerStore from '../../models/Store/bannerStore'
import { saveImages } from './bannerMain'
const { Op } = require('sequelize')

export const getOneBanners = async (_, { idStore }, _ctx, info) => {
    const attributes = getAttributes(bannerStore, info)
    const data = await bannerStore.findOne({
        attributes,
        where: {
            [Op.or]: [
                {
                    idStore: deCode(idStore)
                }
            ]
        }
    })
    return data
}
export const registerBanner = async (_, { input }, _ctx) => {
    try {
        // CREATE FILE SAVE
        const { bnImage, idStore } = input
        if (!idStore) return { success: false, message: 'Ocurrió un error interno' }
        const fileUpload = await bnImage
        const { createReadStream, filename, mimetype, encoding } = fileUpload
        const fileStream = createReadStream()
        let nameFile = filename.replace(/\s+/g, '')
        const path = await saveImages({ filename: nameFile, mimetype, fileStream, state: 4 })
        const OneBannerData = await bannerStore.findOne({
            attributes: ['bnId', 'path', 'idStore', 'bnState'],
            where: {
                [Op.or]: [
                    { idStore: deCode(idStore) }
                ]
            }
        })
        if (OneBannerData) {
            await bannerStore.update({ path: `${URL_BASE}static/banner/${nameFile}`, bnImage: `${URL_BASE}static/banner/${nameFile}` },
                {
                    where: { idStore: deCode(idStore) }
                })
        } else {
            if (path) {
                await bannerStore.create({ idStore: deCode(idStore), bnState: 1, path: `${URL_BASE}static/banner/${nameFile}`, bnImage: `${URL_BASE}static/banner/${nameFile}` })
                return { success: true, message: 'Subido con éxito' }
            } else {
                return { success: false, message: 'No se pudo cargar la imagen' }
            }
        }

    } catch (error) {
        console.log(error)
        return { success: false, message: 'Ocurrió un error' }
    }
}

export const DeleteOneBanner = async (_, { bnId, bnState, idStore }, ctx, info) => {
    try {
        await bannerStore.destroy({
            where: {
                bnId: deCode(bnId),
                idStore: deCode(idStore),
            }
        })
        return { success: true, message: 'Banner Eliminado' }
    } catch (error) {
        return { success: false, message: `${error}, Error interno` }

    }
}

export default {
    TYPES: {
    },
    QUERIES: {
        getOneBanners
    },
    MUTATIONS: {
        registerBanner,
        DeleteOneBanner
    }
}
