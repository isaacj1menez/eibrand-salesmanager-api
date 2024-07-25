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
exports.deleteInventoryItem = exports.updateInventoryItem = exports.getInventoryItemById = exports.getAllInventoryItems = exports.addInventoryItem = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
const inventory_1 = __importDefault(require("../models/inventory"));
// @desc    Agregar un nuevo ítem de inventario
// @route   POST /api/inventory/add
// @access  Public
const addInventoryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg),
        });
    }
    try {
        const { nombre, color, talla, stock, categoria } = req.body;
        const newInventoryItem = new inventory_1.default({
            nombre,
            color,
            talla,
            stock,
            categoria
        });
        const savedItem = yield newInventoryItem.save();
        res.json({
            success: true,
            message: 'Ítem de inventario agregado exitosamente.',
            inventoryItem: savedItem,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al agregar el ítem de inventario.',
            error: error.message,
        });
    }
});
exports.addInventoryItem = addInventoryItem;
// @desc    Obtener todos los ítems de inventario
// @route   GET /api/inventory
// @access  Public
const getAllInventoryItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventoryItems = yield inventory_1.default.find();
        res.json({
            success: true,
            inventoryItems,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al obtener los ítems de inventario.',
            error: error.message,
        });
    }
});
exports.getAllInventoryItems = getAllInventoryItems;
// @desc    Obtener un ítem de inventario por su ID
// @route   GET /api/inventory/:id
// @access  Public
const getInventoryItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return res.json({
                success: false,
                message: 'ID de ítem de inventario no válido.',
            });
        }
        const inventoryItem = yield inventory_1.default.findById(id);
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
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al obtener el ítem de inventario.',
            error: error.message,
        });
    }
});
exports.getInventoryItemById = getInventoryItemById;
// @desc    Actualizar un ítem de inventario por su ID
// @route   PUT /api/inventory/:id
// @access  Public
const updateInventoryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
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
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return res.json({
                success: false,
                message: 'ID de ítem de inventario no válido.',
            });
        }
        const updatedItem = yield inventory_1.default.findByIdAndUpdate(id, { nombre, color, talla, stock, categoria }, { new: true });
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
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al actualizar el ítem de inventario.',
            error: error.message,
        });
    }
});
exports.updateInventoryItem = updateInventoryItem;
// @desc    Eliminar un ítem de inventario por su ID
// @route   DELETE /api/inventory/:id
// @access  Public
const deleteInventoryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return res.json({
                success: false,
                message: 'ID de ítem de inventario no válido.',
            });
        }
        const deletedItem = yield inventory_1.default.findByIdAndDelete(id);
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
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al eliminar el ítem de inventario.',
            error: error.message,
        });
    }
});
exports.deleteInventoryItem = deleteInventoryItem;
//# sourceMappingURL=inventoryController.js.map