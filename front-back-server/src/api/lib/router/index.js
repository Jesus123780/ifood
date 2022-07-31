import { Router } from 'express'
import { updatePhoto } from '../controller/photos'
import upload from '../multer'
const router = Router()

router.route('/photos')
    // .get((req, res) => res.send('hello world'))
    .get(updatePhoto)
    .post(upload.single('image'), updatePhoto)

router.route('/photos/:id')

export default router