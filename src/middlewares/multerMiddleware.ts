import dotenv from 'dotenv';
dotenv.config();
import multer from 'multer';
import multers3 from 'multer-s3';
import { S3Client } from "@aws-sdk/client-s3";
import path from 'path';

// Configuración de S3
export const s3 = new S3Client({
    region: process.env.S3_REGION!,
    credentials: {
        accessKeyId: process.env.S3_ACCESS!,
        secretAccessKey: process.env.S3_SECRET!
    }
});

// Configuración de Multer para S3
const storage = multers3({
    s3,
    bucket: process.env.S3_BUCKET!,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        cb(null, Date.now().toString() + fileExtension);
    }
});

// Filtro para validar archivos permitidos
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten formatos JPG o PNG'));
    }
};

export const upload = multer({ 
    storage, 
    fileFilter 
});
