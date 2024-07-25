"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../config/multer"));
const fileUploadController_1 = require("../controllers/fileUploadController");
const router = express_1.default.Router();
router.post('/', multer_1.default.single('imagen'), fileUploadController_1.uploadFile);
router.delete('/delete/:secure_url', fileUploadController_1.deleteFile);
exports.default = router;
//# sourceMappingURL=fileUploadRoutes.js.map