import Store from "../../models/Store/Store"
import { URL_BASE } from "../../utils"
import { deCode } from "../../utils/util"
import { unlinkSync } from 'fs';
import { saveImages } from "../banners/bannerMain"


export const deleteALogoStore = async (_root, { idStore, Image }, ctx) => {
    try {
        if (Image) {
            unlinkSync(`public/logo/${Image}`);
        }
    } catch (err) {
        console.log(err)
    };
    await Store.update({ Image: null, ImageName: null }, { where: { idStore: deCode(idStore || ctx.restaurant) } })
    return {
        success: true,
        message: 'Logo eliminado'
    }
}
export const setALogoStore = async (_root, { logo, idStore }, ctx) => {
    try {
        const fileUpload = await logo
        const { createReadStream, filename, mimetype, encoding } = fileUpload
        const fileStream = createReadStream()
        await saveImages({ filename, mimetype, fileStream, state: 3 })
        let nameFile = filename.replace(/\s+/g, '')
        await Store.update({ Image: `${URL_BASE}static/logo/${nameFile}`, ImageName: filename  }, { where: { idStore: deCode(idStore) } })
        return {
            success: true,
            message: 'Logo subido con éxito'
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
        setALogoStore,
        deleteALogoStore
    },
}
