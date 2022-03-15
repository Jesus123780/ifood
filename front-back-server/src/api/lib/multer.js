import multer from 'multer';
// import uuid from 'uuid/v4';
import path from 'path'
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime() + path.extname(file.originalname)}`)
    }
});
export default multer({ storage });