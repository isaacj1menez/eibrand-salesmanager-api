import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Types } from 'mongoose';
import Inventory from '../models/inventory';

// @desc    Agregar un nuevo ítem de inventario
// @route   POST /api/inventory/add
// @access  Public
export const addInventoryItem = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg),
        });
    }

    try {
        const { nombre, color, talla, stock, categoria } = req.body;

        const newInventoryItem = new Inventory({
            nombre,
            color,
            talla,
            stock,
            categoria
        });

        const savedItem = await newInventoryItem.save();

        res.json({
            success: true,
            message: 'Ítem de inventario agregado exitosamente.',
            inventoryItem: savedItem,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al agregar el ítem de inventario.',
            error: error.message,
        });
    }
};

// @desc    Obtener todos los ítems de inventario
// @route   GET /api/inventory
// @access  Public
export const getAllInventoryItems = async (req: Request, res: Response) => {
    try {
        const inventoryItems = await Inventory.find();

        res.json({
            success: true,
            inventoryItems,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al obtener los ítems de inventario.',
            error: error.message,
        });
    }
};

// @desc    Obtener un ítem de inventario por su ID
// @route   GET /api/inventory/:id
// @access  Public
export const getInventoryItemById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (!Types.ObjectId.isValid(id)) {
            return res.json({
                success: false,
                message: 'ID de ítem de inventario no válido.',
            });
        }

        const inventoryItem = await Inventory.findById(id);

        if (!inventoryItem) {
            return res.json({
                success: false,
                message: 'Ítem de inventario no encontrado.',
            });
        }

        res.json({
            success: true,
            inventoryItem,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al obtener el ítem de inventario.',
            error: error.message,
        });
    }
};

// @desc    Actualizar un ítem de inventario por su ID
// @route   PUT /api/inventory/:id
// @access  Public
export const updateInventoryItem = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg),
        });
    }

    const { id } = req.params;
    const { nombre, color, talla, stock, categoria } = req.body;

    try {
        if (!Types.ObjectId.isValid(id)) {
            return res.json({
                success: false,
                message: 'ID de ítem de inventario no válido.',
            });
        }

        const updatedItem = await Inventory.findByIdAndUpdate(
            id,
            { nombre, color, talla, stock, categoria },
            { new: true }
        );

        if (!updatedItem) {
            return res.json({
                success: false,
                message: 'Ítem de inventario no encontrado.',
            });
        }

        res.json({
            success: true,
            message: 'Ítem de inventario actualizado exitosamente.',
            inventoryItem: updatedItem,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al actualizar el ítem de inventario.',
            error: error.message,
        });
    }
};

// @desc    Eliminar un ítem de inventario por su ID
// @route   DELETE /api/inventory/:id
// @access  Public
export const deleteInventoryItem = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (!Types.ObjectId.isValid(id)) {
            return res.json({
                success: false,
                message: 'ID de ítem de inventario no válido.',
            });
        }

        const deletedItem = await Inventory.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.json({
                success: false,
                message: 'Ítem de inventario no encontrado.',
            });
        }

        res.json({
            success: true,
            message: 'Ítem de inventario eliminado exitosamente.',
            inventoryItem: deletedItem,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al eliminar el ítem de inventario.',
            error: error.message,
        });
    }
};
