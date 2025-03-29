import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3 } from '../middlewares/S3Middleware';

export const getGallery = async (req: Request, res: Response) => {
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
}