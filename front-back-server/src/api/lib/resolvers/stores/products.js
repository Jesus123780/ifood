import { URL_BASE } from '../../utils'
import productModelFood from '../../models/product/productFood'
import fs from 'fs'
import { deCode } from '../../utils/util'
import { Op } from 'sequelize'

export const saveImagesProducts = async ({ filename, fileStream }) => {
    const path = `public/platos/${filename}`
    await fileStream.pipe(fs.createWriteStream(path))
    return path
}
export const setImageProducts = async (_root, { input }) => {
    try {
        const { pCode, file, pId } = input || {}
        const fileUpload = await file
        // eslint-disable-next-line no-unused-vars
        const { createReadStream, filename, mimetype } = fileUpload
        const fileStream = createReadStream()
        await saveImagesProducts({ filename, mimetype, fileStream })
        const data = await productModelFood.findOne({
            attributes: ['pCode', 'pId'],
            where: {
                [Op.or]: [
                    {
                        ...((pId) ? deCode(pId) : {}),
                        pCode: pCode
                    }
                ]
            }
        })
        if (data) {
            await productModelFood.update({ ProImage: `${process.env.URL_BASE}static/platos/${filename}` },
                {
                    where: {
                        pCode: pCode,
                        ...((pId) ? deCode(pId) : {})
                    }
                })
        }
        if (!data || file) {
            return {
                success: false,
                message: 'No pudimos cargar la imagen'
            }
        }
        return {
            success: true,
            message: 'Imagen cargada con éxito'
        }
    } catch (error) {
        return {
            success: false,
            message: 'Lo sentimos ha ocurrido un error vuelve a intentarlo'
        }
    }
}
export default {
    TYPES: {
    },
    QUERIES: {
    },
    MUTATIONS: {
        setImageProducts
    }
}
