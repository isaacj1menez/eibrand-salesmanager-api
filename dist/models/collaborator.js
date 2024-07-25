"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CollaboratorSchema = new mongoose_1.Schema({
    nombreCompleto: {
        type: String,
        required: true,
        trim: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});
const Collaborator = (0, mongoose_1.model)('Collaborator', CollaboratorSchema);
exports.default = Collaborator;
//# sourceMappingURL=collaborator.js.map