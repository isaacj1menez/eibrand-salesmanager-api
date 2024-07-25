"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("./cloudinary"));
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: {
        public_id: (req, file) => file.originalname.split('.')[0]
    }
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
//# sourceMappingURL=multer.js.map