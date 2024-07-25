"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSale = exports.updateSale = exports.getSaleById = exports.getAllSales = exports.addSale = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const sale_1 = __importDefault(require("../models/sale"));
const product_1 = __importDefault(require("../models/product"));
const inventory_1 = __importDefault(require("../models/inventory"));
const addSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg),
        });
    }
    const session = yield mongoose_1.default.startSession();
    try {
        const { fecha, fechaEntrega, total, anticipo, restante, metodoPago, status, descuento, envio, cargoDisenos, impuestos, statusPago, cliente, productos, imagenComprobante, observaciones, guiaEnvio, puntoEntrega, urgente, vendedor, resultado } = req.body;
        session.startTransaction();
        for (let i = 0; i < productos.length; i++) {
            const product = productos[i];
            if (product.id) {
                const existingProduct = yield product_1.default.findById(product.id);
                if (!existingProduct) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.json({
                        success: false,
                        message: `Producto con ID ${product.id} no encontrado.`,
                    });
                }
                const existingInventory = yield inventory_1.default.findById(product.inventario);
                if (existingInventory) {
                    if (existingInventory.stock < product.cantidad) {
                        return res.json({
                            success: false,
                            message: `No hay suficiente stock disponible para el producto ${existingInventory.nombre}.`,
                        });
                    }
                    existingInventory.stock -= product.cantidad;
                    yield existingInventory.save();
                }
            }
        }
        const newSale = new sale_1.default({
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
        const savedSale = yield newSale.save();
        yield session.commitTransaction();
        session.endSession();
        res.json({
            success: true,
            message: 'Venta agregada exitosamente.',
            sale: savedSale,
        });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        res.json({
            success: false,
            message: 'Error al agregar la venta.' + error.message,
            errors: error.message,
        });
    }
});
exports.addSale = addSale;
const getAllSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield sale_1.default.find();
        res.json({
            success: true,
            message: 'Ventas recuperadas exitosamente.',
            sales,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al recuperar las ventas.',
            errors: error.message,
        });
    }
});
exports.getAllSales = getAllSales;
const getSaleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const sale = yield sale_1.default.findById(id);
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
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al recuperar la venta.',
            errors: error.message,
        });
    }
});
exports.getSaleById = getSaleById;
const updateSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg),
        });
    }
    const session = yield mongoose_1.default.startSession();
    try {
        const { id } = req.params;
        const { fecha, fechaEntrega, total, anticipo, restante, metodoPago, status, descuento, envio, cargoDisenos, impuestos, statusPago, cliente, productos, imagenComprobante, observaciones, guiaEnvio, puntoEntrega, urgente, vendedor, resultado } = req.body;
        session.startTransaction();
        const sale = yield sale_1.default.findById(id);
        if (!sale) {
            yield session.abortTransaction();
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
                const existingProduct = yield product_1.default.findById(product.id);
                if (!existingProduct) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.json({
                        success: false,
                        message: `Producto con ID ${product.id} no encontrado.`,
                    });
                }
                const existingInventory = yield inventory_1.default.findById(product.inventario);
                if (existingInventory) {
                    existingInventory.stock += product.cantidad;
                    yield existingInventory.save();
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
                const existingProduct = yield product_1.default.findById(product.id);
                if (!existingProduct) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.json({
                        success: false,
                        message: `Producto con ID ${product.id} no encontrado.`,
                    });
                }
                const existingInventory = yield inventory_1.default.findById(product.inventario);
                if (existingInventory) {
                    if (existingInventory.stock < product.cantidad) {
                        yield session.abortTransaction();
                        session.endSession();
                        return res.json({
                            success: false,
                            message: `No hay suficiente stock disponible para el producto ${existingInventory.nombre}.`,
                        });
                    }
                    existingInventory.stock -= product.cantidad;
                    yield existingInventory.save();
                }
            }
        }
        const updatedSale = yield sale.save();
        yield session.commitTransaction();
        session.endSession();
        res.json({
            success: true,
            message: 'Venta actualizada exitosamente.',
            sale: updatedSale,
        });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        res.json({
            success: false,
            message: 'Error al actualizar la venta.',
            errors: error.message,
        });
    }
});
exports.updateSale = updateSale;
const deleteSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        const { id } = req.params;
        session.startTransaction();
        const sale = yield sale_1.default.findById(id);
        if (!sale) {
            yield session.abortTransaction();
            session.endSession();
            return res.json({
                success: false,
                message: 'Venta no encontrada.',
            });
        }
        yield sale.deleteOne();
        yield session.commitTransaction();
        session.endSession();
        res.json({
            success: true,
            message: 'Venta eliminada exitosamente.',
        });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        res.json({
            success: false,
            message: 'Error al eliminar la venta.',
            errors: error.message,
        });
    }
});
exports.deleteSale = deleteSale;
//# sourceMappingURL=saleController.js.map