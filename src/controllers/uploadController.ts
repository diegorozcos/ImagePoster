import { Request, Response } from 'express';

export const getUploadForm = (req: Request, res: Response) => {
    res.render('upload');
}

export const uploadFile = (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).render('upload', { error: "Debe subir una imagen válida" });
    }
    res.redirect('/');
}

export const handleUploadError = (err: any, req: Request, res: Response) => {
    res.status(400).render('upload', { error: err.message });
}
