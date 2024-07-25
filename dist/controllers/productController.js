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
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getAllProducts = exports.addProduct = void 0;
const express_validator_1 = require("express-validator");
const product_1 = __importDefault(require("../models/product"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg)
        });
    }
    try {
        const { nombre, precio, categoriaBase, categoria, codigo, descripcion, imagen } = req.body;
        const newProduct = new product_1.default({
            nombre,
            precio,
            categoriaBase,
            categoria,
            imagen,
            codigo,
            descripcion,
        });
        yield newProduct.save();
        res.json({
            success: true,
            message: 'Producto agregado exitosamente.',
            product: newProduct,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al agregar el producto.',
            errors: error.message,
        });
    }
});
exports.addProduct = addProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        res.json({
            success: true,
            message: 'Productos obtenidos exitosamente.',
            products,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al obtener los productos.',
            errors: error.message,
        });
    }
});
exports.getAllProducts = getAllProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, nombre, codigo } = req.query;
    try {
        let product;
        if (id) {
            product = yield product_1.default.findById(id);
        }
        else if (nombre) {
            product = yield product_1.default.findOne({ nombre: nombre });
        }
        else if (codigo) {
            product = yield product_1.default.findOne({ codigo: codigo });
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
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al obtener el producto.',
            errors: error.message,
        });
    }
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
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
        const updatedProduct = yield product_1.default.findByIdAndUpdate(id, {
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
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al actualizar el producto.',
            errors: error.message,
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedProduct = yield product_1.default.findByIdAndDelete(id);
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
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al eliminar el producto.',
            errors: error.message,
        });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map