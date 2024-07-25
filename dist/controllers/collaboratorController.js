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
exports.deleteCollaborator = exports.updateCollaborator = exports.getCollaboratorById = exports.getAllCollaborators = exports.addCollaborator = void 0;
const express_validator_1 = require("express-validator");
const collaborator_1 = __importDefault(require("../models/collaborator"));
// Agregar colaborador
const addCollaborator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg),
        });
    }
    try {
        const { nombreCompleto, correo, telefono } = req.body;
        const newCollaborator = new collaborator_1.default({ nombreCompleto, correo, telefono });
        const savedCollaborator = yield newCollaborator.save();
        res.json({
            success: true,
            message: 'Colaborador agregado exitosamente.',
            collaborator: savedCollaborator,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al agregar el colaborador.',
            errors: error.message,
        });
    }
});
exports.addCollaborator = addCollaborator;
// Obtener todos los colaboradores
const getAllCollaborators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collaborators = yield collaborator_1.default.find();
        res.json({
            success: true,
            collaborators,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al obtener los colaboradores.',
            errors: error.message,
        });
    }
});
exports.getAllCollaborators = getAllCollaborators;
// Obtener colaborador por ID
const getCollaboratorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const collaborator = yield collaborator_1.default.findById(id);
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
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al obtener el colaborador.',
            errors: error.message,
        });
    }
});
exports.getCollaboratorById = getCollaboratorById;
// Actualizar colaborador
const updateCollaborator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
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
        const updatedCollaborator = yield collaborator_1.default.findByIdAndUpdate(id, { nombreCompleto, correo, telefono }, { new: true });
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
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al actualizar el colaborador.',
            errors: error.message,
        });
    }
});
exports.updateCollaborator = updateCollaborator;
// Eliminar colaborador
const deleteCollaborator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCollaborator = yield collaborator_1.default.findByIdAndDelete(id);
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
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al eliminar el colaborador.',
            errors: error.message,
        });
    }
});
exports.deleteCollaborator = deleteCollaborator;
//# sourceMappingURL=collaboratorController.js.map