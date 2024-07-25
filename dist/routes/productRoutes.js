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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const productController_1 = require("../controllers/productController");
const product_1 = __importDefault(require("../models/product"));
const router = express_1.default.Router();
const validateAddProduct = [
    (0, express_validator_1.body)('nombre')
        .isString()
        .notEmpty()
        .withMessage('El nombre es obligatorio.'),
    (0, express_validator_1.body)('precio')
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser un número mayor que cero.'),
    (0, express_validator_1.body)('categoriaBase')
        .isString()
        .notEmpty()
        .withMessage('La categoría base es obligatoria.'),
    (0, express_validator_1.body)('categoria')
        .isString()
        .notEmpty()
        .withMessage('La categoría es obligatoria.'),
    (0, express_validator_1.body)('codigo')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (value && value !== '') {
            const existingProduct = yield product_1.default.findOne({ codigo: value });
            if (existingProduct) {
                throw new Error('El código del producto ya existe.');
            }
        }
    }))
        .withMessage('El código del producto ya existe.'),
    (0, express_validator_1.body)('descripcion')
        .optional()
        .isString()
        .withMessage('La descripción debe ser una cadena.'),
];
const validateUpdateProduct = [
    (0, express_validator_1.body)('nombre')
        .optional()
        .isString()
        .notEmpty()
        .withMessage('El nombre es obligatorio.'),
    (0, express_validator_1.body)('precio')
        .optional()
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser un número mayor que cero.'),
    (0, express_validator_1.body)('categoriaBase')
        .optional()
        .isString()
        .notEmpty()
        .withMessage('La categoría base es obligatoria.'),
    (0, express_validator_1.body)('categoria')
        .optional()
        .isString()
        .notEmpty()
        .withMessage('La categoría es obligatoria.'),
    (0, express_validator_1.body)('codigo')
        .optional()
        .isString()
        .withMessage('El código debe ser una cadena.'),
    (0, express_validator_1.body)('descripcion')
        .optional()
        .isString()
        .withMessage('La descripción debe ser una cadena.'),
];
router.post('/add', validateAddProduct, productController_1.addProduct);
router.get('/all', productController_1.getAllProducts);
router.get('/get', productController_1.getProduct);
router.put('/update/:id', validateUpdateProduct, productController_1.updateProduct);
router.delete('/delete/:id', productController_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map