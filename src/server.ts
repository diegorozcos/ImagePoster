import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import galleryRoutes from './routes/galleryRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { connectDB } from './config/database';

// Configuración de Express
const app = express();
const port = process.env.PORT || 5000;

// Conexión a MongoDB
connectDB();

app.use(express.json());

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Usar rutas
app.use(galleryRoutes);
app.use(uploadRoutes);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
