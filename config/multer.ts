import multer from 'multer';
import cloudinary from './cloudinary';
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        public_id: (req: any, file: any) => file.originalname.split('.')[0]
    }
});

const upload = multer({ storage });

export default upload;
