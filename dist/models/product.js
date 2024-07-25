"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
    },
    categoriaBase: {
        type: String,
        required: true,
        trim: true,
    },
    categoria: {
        type: String,
        required: true,
        trim: true,
    },
    imagen: {
        type: String,
        trim: true,
    },
    codigo: {
        type: String,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});
const Product = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = Product;
//# sourceMappingURL=product.js.map