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
exports.deleteFile = exports.uploadFile = void 0;
const express_validator_1 = require("express-validator");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
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
        const existingFile = yield cloudinary_1.default.api.resources({
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
    }
    catch (error) {
        console.error('Error handling file upload:', error);
        return res.json({
            success: false,
            message: 'Error handling file upload.',
            errors: error.message,
        });
    }
});
exports.uploadFile = uploadFile;
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { secure_url } = req.params;
    if (!secure_url) {
        return res.json({
            success: false,
            message: 'La URL es obligatoria.'
        });
    }
    try {
        const public_id = (_a = secure_url.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
        if (!public_id) {
            return res.json({
                success: false,
                message: 'No se pudo extraer el public_id de la URL.'
            });
        }
        yield cloudinary_1.default.api.delete_resources([`${public_id}`], { type: 'upload', resource_type: 'image' });
        res.json({
            success: true,
            message: 'Archivo eliminado exitosamente.'
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: 'Error al eliminar el archivo.',
            error: error.message
        });
    }
});
exports.deleteFile = deleteFile;
//# sourceMappingURL=fileUploadController.js.map