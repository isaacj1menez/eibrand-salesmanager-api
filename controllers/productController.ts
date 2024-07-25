import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Product from '../models/product';
import cloudinary from '../config/cloudinary';

export const addProduct = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg)
        });
    }

    try {
        const { nombre, precio, categoriaBase, categoria, codigo, descripcion, imagen } = req.body;

        const newProduct = new Product({
            nombre,
            precio,
            categoriaBase,
            categoria,
            imagen,
            codigo,
            descripcion,
        });

        await newProduct.save();

        res.json({
            success: true,
            message: 'Producto agregado exitosamente.',
            product: newProduct,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al agregar el producto.',
            errors: error.message,
        });
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();

        res.json({
            success: true,
            message: 'Productos obtenidos exitosamente.',
            products,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al obtener los productos.',
            errors: error.message,
        });
    }
};

export const getProduct = async (req: Request, res: Response) => {
    const { id, nombre, codigo } = req.query;

    try {
        let product;

        if (id) {
            product = await Product.findById(id);
        } else if (nombre) {
            product = await Product.findOne({ nombre: nombre as string });
        } else if (codigo) {
            product = await Product.findOne({ codigo: codigo as string });
        }

        if (!product) {
            return res.json({
                success: false,
                message: 'Producto no encontrado.',
            });
        }

        res.json({
            success: true,
            message: 'Producto obtenido exitosamente.',
            product,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al obtener el producto.',
            errors: error.message,
        });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg)
        });
    }

    const { id } = req.params;
    const { nombre, precio, categoriaBase, categoria, codigo, descripcion, imagen } = req.body;

    try {

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            nombre,
            precio,
            categoriaBase,
            categoria,
            imagen,
            codigo,
            descripcion,
        }, { new: true });

        if (!updatedProduct) {
            return res.json({
                success: false,
                message: 'Producto no encontrado.',
            });
        }

        res.json({
            success: true,
            message: 'Producto actualizado exitosamente.',
            product: updatedProduct,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al actualizar el producto.',
            errors: error.message,
        });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.json({
                success: false,
                message: 'Producto no encontrado.',
            });
        }

        res.json({
            success: true,
            message: 'Producto eliminado exitosamente.',
            product: deletedProduct,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al eliminar el producto.',
            errors: error.message,
        });
    }
};
