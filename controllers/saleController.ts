import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Sale from '../models/sale';
import Product from '../models/product';
import Inventory from '../models/inventory';

export const addSale = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg),
        });
    }

    const session = await mongoose.startSession();
    try {
        const {
            fecha,
            fechaEntrega,
            total,
            anticipo,
            restante,
            metodoPago,
            status,
            descuento,
            envio,
            cargoDisenos,
            impuestos,
            statusPago,
            cliente,
            productos,
            imagenComprobante,
            observaciones,
            guiaEnvio,
            puntoEntrega,
            urgente,
            vendedor,
            resultado
        } = req.body;

        session.startTransaction();

        for (let i = 0; i < productos.length; i++) {
            const product = productos[i];
            if (product.id) {
                const existingProduct = await Product.findById(product.id);
                if (!existingProduct) {
                    await session.abortTransaction();
                    session.endSession();
                    return res.json({
                        success: false,
                        message: `Producto con ID ${product.id} no encontrado.`,
                    });
                }

                const existingInventory = await Inventory.findById(product.inventario);

                if (existingInventory) {
                    if (existingInventory.stock < product.cantidad) {
                        return res.json({
                            success: false,
                            message: `No hay suficiente stock disponible para el producto ${existingInventory.nombre}.`,
                        });
                    }
                    existingInventory.stock -= product.cantidad
                    await existingInventory.save();
                }
            }

        }

        const newSale = new Sale({
            fecha,
            fechaEntrega,
            total,
            anticipo,
            restante,
            metodoPago,
            status,
            descuento,
            envio,
            cargoDisenos,
            impuestos,
            statusPago,
            cliente,
            productos,
            imagenComprobante,
            observaciones,
            guiaEnvio,
            puntoEntrega,
            urgente,
            vendedor,
            resultado
        });

        const savedSale = await newSale.save();
        await session.commitTransaction();
        session.endSession();

        res.json({
            success: true,
            message: 'Venta agregada exitosamente.',
            sale: savedSale,
        });
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        res.json({
            success: false,
            message: 'Error al agregar la venta.' + error.message,
            errors: error.message,
        });
    }
};

export const getAllSales = async (req: Request, res: Response) => {
    try {
        const sales = await Sale.find();
        res.json({
            success: true,
            message: 'Ventas recuperadas exitosamente.',
            sales,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al recuperar las ventas.',
            errors: error.message,
        });
    }
};

export const getSaleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const sale = await Sale.findById(id);

        if (!sale) {
            return res.json({
                success: false,
                message: 'Venta no encontrada.',
            });
        }

        res.json({
            success: true,
            message: 'Venta recuperada exitosamente.',
            sale,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: 'Error al recuperar la venta.',
            errors: error.message,
        });
    }
};

export const updateSale = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg),
        });
    }

    const session = await mongoose.startSession();
    try {
        const { id } = req.params;
        const {
            fecha,
            fechaEntrega,
            total,
            anticipo,
            restante,
            metodoPago,
            status,
            descuento,
            envio,
            cargoDisenos,
            impuestos,
            statusPago,
            cliente,
            productos,
            imagenComprobante,
            observaciones,
            guiaEnvio,
            puntoEntrega,
            urgente,
            vendedor,
            resultado
        } = req.body;

        session.startTransaction();

        const sale = await Sale.findById(id);
        if (!sale) {
            await session.abortTransaction();
            session.endSession();
            return res.json({
                success: false,
                message: 'Venta no encontrada.',
            });
        }

        // Restaurar el stock original de los productos involucrados en la venta
        for (let i = 0; i < sale.productos.length; i++) {
            const product = sale.productos[i];
            if (product.id) {
                const existingProduct = await Product.findById(product.id);
                if (!existingProduct) {
                    await session.abortTransaction();
                    session.endSession();
                    return res.json({
                        success: false,
                        message: `Producto con ID ${product.id} no encontrado.`,
                    });
                }


                const existingInventory = await Inventory.findById(product.inventario);
                if (existingInventory) {
                    existingInventory.stock += product.cantidad;
                    await existingInventory.save();
                }
            }
        }

        // Actualizar la venta con los nuevos datos
        sale.fecha = fecha;
        sale.fechaEntrega = fechaEntrega;
        sale.total = total;
        sale.anticipo = anticipo;
        sale.restante = restante;
        sale.metodoPago = metodoPago;
        sale.status = status;
        sale.descuento = descuento;
        sale.envio = envio;
        sale.cargoDisenos = cargoDisenos;
        sale.impuestos = impuestos;
        sale.statusPago = statusPago;
        sale.cliente = cliente;
        sale.productos = productos;
        sale.imagenComprobante = imagenComprobante;
        sale.observaciones = observaciones;
        sale.guiaEnvio = guiaEnvio;
        sale.puntoEntrega = puntoEntrega;
        sale.urgente = urgente;
        sale.vendedor = vendedor;
        sale.resultado = resultado;

        // Actualizar el stock de los productos con las nuevas cantidades vendidas
        for (let i = 0; i < productos.length; i++) {
            const product = productos[i];
            if (product.id) {
                const existingProduct = await Product.findById(product.id);
                if (!existingProduct) {
                    await session.abortTransaction();
                    session.endSession();
                    return res.json({
                        success: false,
                        message: `Producto con ID ${product.id} no encontrado.`,
                    });
                }

                const existingInventory = await Inventory.findById(product.inventario);
                if (existingInventory) {
                    if (existingInventory.stock < product.cantidad) {
                        await session.abortTransaction();
                        session.endSession();
                        return res.json({
                            success: false,
                            message: `No hay suficiente stock disponible para el producto ${existingInventory.nombre}.`,
                        });
                    }
                    existingInventory.stock -= product.cantidad;
                    await existingInventory.save();
                }
            }
        }

        const updatedSale = await sale.save();
        await session.commitTransaction();
        session.endSession();
        res.json({
            success: true,
            message: 'Venta actualizada exitosamente.',
            sale: updatedSale,
        });
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        res.json({
            success: false,
            message: 'Error al actualizar la venta.',
            errors: error.message,
        });
    }
};


export const deleteSale = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    try {
        const { id } = req.params;
        session.startTransaction();

        const sale = await Sale.findById(id);
        if (!sale) {
            await session.abortTransaction();
            session.endSession();
            return res.json({
                success: false,
                message: 'Venta no encontrada.',
            });
        }

        await sale.deleteOne();
        await session.commitTransaction();
        session.endSession();

        res.json({
            success: true,
            message: 'Venta eliminada exitosamente.',
        });
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        res.json({
            success: false,
            message: 'Error al eliminar la venta.',
            errors: error.message,
        });
    }
};
