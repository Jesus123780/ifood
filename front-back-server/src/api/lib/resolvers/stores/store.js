import Store from "../../models/Store/Store"
import { URL_BASE } from "../../utils"
import { deCode } from "../../utils/util"
import { saveImages } from "../banners/bannerMain"


export const setALogoStore = async (_root, { logo, idStore }, ctx) => {
    try {
        console.log('HOLA MUNDO')
        const fileUpload = await logo
        const { createReadStream, filename, mimetype, encoding } = fileUpload
        // saveImages()
        const fileStream = createReadStream()
        const path = await saveImages({ filename, mimetype, fileStream, state: 3 })
        console.log(logo)
        await Store.update({ Image: `${URL_BASE}static/logo/${filename}` }, { where: { idStore: deCode(idStore) } })
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
        setALogoStore
    },
}
