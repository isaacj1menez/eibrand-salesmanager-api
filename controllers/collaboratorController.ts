import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Collaborator from '../models/collaborator';

// Agregar colaborador
export const addCollaborator = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg),
        });
    }

    try {
        const { nombreCompleto, correo, telefono } = req.body;
        const newCollaborator = new Collaborator({ nombreCompleto, correo, telefono });
        const savedCollaborator = await newCollaborator.save();

        res.json({
            success: true,
            message: 'Colaborador agregado exitosamente.',
            collaborator: savedCollaborator,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al agregar el colaborador.',
            errors: error.message,
        });
    }
};

// Obtener todos los colaboradores
export const getAllCollaborators = async (req: Request, res: Response) => {
    try {
        const collaborators = await Collaborator.find();
        res.json({
            success: true,
            collaborators,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al obtener los colaboradores.',
            errors: error.message,
        });
    }
};

// Obtener colaborador por ID
export const getCollaboratorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const collaborator = await Collaborator.findById(id);

        if (!collaborator) {
            return res.json({
                success: false,
                message: 'Colaborador no encontrado.',
            });
        }

        res.json({
            success: true,
            collaborator,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al obtener el colaborador.',
            errors: error.message,
        });
    }
};

// Actualizar colaborador
export const updateCollaborator = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg),
        });
    }

    try {
        const { id } = req.params;
        const { nombreCompleto, correo, telefono } = req.body;

        const updatedCollaborator = await Collaborator.findByIdAndUpdate(
            id,
            { nombreCompleto, correo, telefono },
            { new: true }
        );

        if (!updatedCollaborator) {
            return res.json({
                success: false,
                message: 'Colaborador no encontrado.',
            });
        }

        res.json({
            success: true,
            message: 'Colaborador actualizado exitosamente.',
            collaborator: updatedCollaborator,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al actualizar el colaborador.',
            errors: error.message,
        });
    }
};

// Eliminar colaborador
export const deleteCollaborator = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCollaborator = await Collaborator.findByIdAndDelete(id);

        if (!deletedCollaborator) {
            return res.json({
                success: false,
                message: 'Colaborador no encontrado.',
            });
        }

        res.json({
            success: true,
            message: 'Colaborador eliminado exitosamente.',
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al eliminar el colaborador.',
            errors: error.message,
        });
    }
};
