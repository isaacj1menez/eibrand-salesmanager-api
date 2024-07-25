"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/Inventory.ts
const mongoose_1 = require("mongoose");
const InventorySchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },
    talla: {
        type: String,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    categoria: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });
const Inventory = (0, mongoose_1.model)('Inventory', InventorySchema);
exports.default = Inventory;
//# sourceMappingURL=inventory.js.map