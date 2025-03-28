import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import multers3 from 'multer-s3';
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import path from 'path';
import { engine } from 'express-handlebars';

// Configuración de Express
const app = express();
const port = process.env.PORT || 5000;

// Configuración de S3
const s3 = new S3Client({
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
    metadata: function(req: Request, file: Express.Multer.File, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function(req: Request, file: Express.Multer.File, cb) {
        const fileExtension = path.extname(file.originalname); // Obtiene la extensión (.jpg, .png)
        cb(null, Date.now().toString() + fileExtension); // Agrega la extensión al nombre del archivo
    }
});


const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten formatos JPG o PNG'));
    }
};

const upload = multer({ storage, fileFilter });

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Ruta principal para ver imágenes
app.get('/', async (req: Request, res: Response) => {
    try {
        const command = new ListObjectsV2Command({ Bucket: process.env.S3_BUCKET! });
        const { Contents } = await s3.send(command);

        const files = Contents?.map(file => ({
            url: `https://${process.env.S3_BUCKET!}.s3.${process.env.S3_REGION!}.amazonaws.com/${file.Key}`,
            name: file.Key
        })) || [];

        res.render('gallery', { files, hasFiles: files.length > 0 });

    } catch (error) {
        console.error("Error al obtener imágenes de S3:", error);
        res.status(500).send("Error al obtener imágenes");
    }
});

// Ruta para mostrar el formulario de carga
app.get('/upload', (req: Request, res: Response) => {
    res.render('upload');
});

// Ruta para subir imágenes con manejo de errores
app.post('/uploads', upload.single('image'), (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return res.status(400).render('upload', { error: "Debe subir una imagen válida" });
    }
    res.redirect('/');
}, (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(400).render('upload', { error: err.message });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
