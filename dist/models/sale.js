"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SaleSchema = new mongoose_1.Schema({
    fecha: {
        type: Date,
        required: true,
    },
    fechaEntrega: {
        type: Date,
        required: true,
    },
    total: {
        type: Number,
        required: true,
        min: 0,
    },
    anticipo: {
        type: Number,
        min: 0,
    },
    restante: {
        type: Number,
        required: true,
        min: 0,
    },
    metodoPago: {
        type: String,
        required: true,
        trim: true,
        enum: ['EFECTIVO', 'TRANSFERENCIA', 'DEPÓSITO'],
    },
    status: {
        type: String,
        required: true,
        trim: true,
        enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA', 'ENVIADA'],
    },
    descuento: {
        type: Number,
        min: 0,
    },
    envio: {
        type: Number,
        min: 0,
    },
    cargoDisenos: {
        type: Number,
        min: 0,
    },
    impuestos: {
        type: Number,
        min: 0,
    },
    statusPago: {
        type: String,
        required: true,
        trim: true,
        enum: ['PENDIENTE', 'PAGADO', 'ANTICIPO'],
    },
    cliente: {
        nombre: { type: String, required: true, trim: true },
        telefono: { type: String, required: true, trim: true },
        canalComunicacion: {
            type: String,
            required: true,
            trim: true,
            enum: ['INSTAGRAM', 'FACEBOOK', 'GOOGLE', 'WHATSAPP', 'PERSONAL'],
        },
        direccion: {
            direccion: { type: String, trim: true },
            codigoPostal: { type: String, trim: true },
            estado: { type: String, trim: true },
        },
    },
    productos: [
        {
            id: { type: String },
            nombre: { type: String, required: true, trim: true },
            cantidad: { type: Number, required: true, min: 1 },
            precio: { type: Number, required: true, min: 0 },
            subtotal: { type: Number, required: true, min: 0 },
            diseno: { type: String, trim: true },
            inventario: { type: mongoose_1.Schema.Types.ObjectId },
            categoria: { type: String }
        },
    ],
    imagenComprobante: { type: String, trim: true },
    observaciones: { type: String, trim: true },
    guiaEnvio: { type: String, trim: true },
    puntoEntrega: { type: String, trim: true },
    urgente: { type: Boolean, default: false },
    vendedor: { type: String, required: true },
    resultado: { type: String },
}, { timestamps: true });
const Sale = (0, mongoose_1.model)('Sale', SaleSchema);
exports.default = Sale;
//# sourceMappingURL=sale.js.map