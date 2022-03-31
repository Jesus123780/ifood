import { URL_BASE } from "../../utils"
import productModelFood from "../../models/product/productFood"
import fs from 'fs'
const { Op } = require('sequelize')

export const saveImagesProducts = async ({ filename, mimetype, fileStream, state }) => {
    const path = `public/platos/${filename}`
    await fileStream.pipe(fs.createWriteStream(path))
    return path
}
export const setImageProducts = async (_root, { input }, ctx) => {
    try {
        const { pCode, file } = input || {}
        const fileUpload = await file
        const { createReadStream, filename, mimetype, encoding } = fileUpload
        const fileStream = createReadStream()
        const fil = await saveImagesProducts({ filename, mimetype, fileStream })
        console.log(fil)
        const data = await productModelFood.findOne({
            attributes: ['pCode', 'pId'],
            where: {
                [Op.or]: [
                    {
                        pCode: pCode,
                    }
                ]
            }
        })
        if (!data || file) {
            return {
                success: false,
                message: 'No pudimos cargar la imagen'
            }
        } else {
            // console.log(data.pId)
            // await productModelFood.update({ ProImage: `${URL_BASE}static/platos/${filename}` },
            //     {
            //         where: {
            //             pCode: pCode,
            //             ...((data.pId) ? deCode(data.pId) : {}),
            //         }
            //     })
        }
        return {
            success: true,
            message: 'Imagen cargada con éxito'
        }
    } catch (error) {
        console.log(error)
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
    },
}
