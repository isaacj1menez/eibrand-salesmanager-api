import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import cloudinary from '../config/cloudinary';

export const uploadFile = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            errors: errors.array().map(error => error.msg),
        });
    }

    if (!req.file) {
        return res.json({
            success: false,
            message: 'No file uploaded.',
        });
    }

    try {
        // Check if the file with the same name already exists in Cloudinary
        const fileName = req.file.originalname.split('.')[0]; // Assuming the file name without extension
        const existingFile = await cloudinary.api.resources({
            type: 'upload',
            prefix: fileName,
            resource_type: 'image',
            max_results: 1
        });


        return res.json({
            success: true,
            message: 'File uploaded successfully.',
            url: req.file.path,
        });

    } catch (error: any) {
        console.error('Error handling file upload:', error);
        return res.json({
            success: false,
            message: 'Error handling file upload.',
            errors: error.message,
        });
    }
};

export const deleteFile = async (req: Request, res: Response) => {
    const { secure_url } = req.params;

    if (!secure_url) {
        return res.json({
            success: false,
            message: 'La URL es obligatoria.'
        });
    }

    try {
        const public_id = secure_url.split('/').pop()?.split('.')[0];

        if (!public_id) {
            return res.json({
                success: false,
                message: 'No se pudo extraer el public_id de la URL.'
            });
        }

        await cloudinary.api.delete_resources([`${public_id}`], { type: 'upload', resource_type: 'image' });

        res.json({
            success: true,
            message: 'Archivo eliminado exitosamente.'
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al eliminar el archivo.',
            error: error.message
        });
    }
};