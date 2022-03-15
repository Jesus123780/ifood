// import CatStore from '../../models/'

import { ApolloError } from "apollo-server-express";
import CatStore from "../../models/information/CategorieStore";
import { URL_BASE } from "../../utils";

export async function updatePhoto(req, res) {
    const { cName, csDescription } = req.body;
    const { fieldname, originalname, filename } = req.file
    try {
        // await fs.unlink(path.resolve(photo.imagePath));
        const res = await CatStore.create({ cName, csDescription, cPathImage: `${URL_BASE}uploads/${filename}` })
        return res.json({
            message: 'Successfully updated',
        });
    } catch (e) {
        return res.json({
            message: e,
        });
    }
}