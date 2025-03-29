import dotenv from 'dotenv';
dotenv.config();
import { connect } from 'mongoose';

const db_uri = process.env.MONGO_URI ?? '';

export const connectDB = async () => {
    try {
        await connect(db_uri);
        console.log("MongoDB conectado correctamente");
    } catch (error) {
        console.log("Conexión a MongoDB fallida", error);
    }
}