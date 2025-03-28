import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { engine } from 'express-handlebars';

// Variables globales
const app = express();
const port = 3000;
const uploadDir = path.join(__dirname, '..', 'uploads');

// Asegurar que la carpeta uploads existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
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

const upload = multer({
    storage,
    fileFilter
});

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '..', 'views'));

// Middleware para archivos estáticos
app.use("/uploads", express.static(uploadDir));

// Ruta para ver las imágenes
app.get('/', (req, res) => {
    fs.readdir(uploadDir, (error, files) => {
        if (error) {
            return res.status(500).send("Error al leer la carpeta de imágenes");
        }
        res.render('gallery', { files, hasFiles: files.length > 0 });
    });
});

// Ruta para mostrar el formulario de carga
app.get('/upload', (req, res) => {
    res.render('upload'); // Vista del formulario
});

// Ruta para subir imágenes con manejo de errores
app.post('/uploads', upload.single('image'), (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).send("Debe subir una imagen válida");
    }
    res.redirect('/');
}, (err: any, req: Request, res: Response, next: Function) => {
    res.status(400).send(err.message);
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
