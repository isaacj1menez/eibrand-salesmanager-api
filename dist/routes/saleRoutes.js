"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const saleController_1 = require("../controllers/saleController");
const router = express_1.default.Router();
// Middleware de validación para el cuerpo de la solicitud de venta
const validateSale = [
    (0, express_validator_1.body)('fecha')
        .notEmpty()
        .withMessage('La fecha es obligatoria y debe tener un formato válido.'),
    (0, express_validator_1.body)('total')
        .isNumeric()
        .withMessage('El total debe ser un número.'),
    (0, express_validator_1.body)('restante')
        .isNumeric()
        .withMessage('El restante debe ser un número.'),
    (0, express_validator_1.body)('metodoPago')
        .isString()
        .notEmpty()
        .withMessage('El método de pago es obligatorio y debe ser una cadena.'),
    (0, express_validator_1.body)('status')
        .isIn(['PENDIENTE', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA', 'ENVIADA'])
        .withMessage('El estado debe ser uno de: pendiente, en_proceso, completada, cancelada.'),
    (0, express_validator_1.body)('statusPago')
        .isIn(['PENDIENTE', 'PAGADO', 'ANTICIPO'])
        .withMessage('El estado de pago debe ser uno de: pendiente, pagado, vencido, reembolsado.'),
    (0, express_validator_1.body)('cliente.nombre')
        .isString()
        .notEmpty()
        .withMessage('El nombre del cliente es obligatorio y debe ser una cadena.'),
    (0, express_validator_1.body)('cliente.telefono')
        .isString()
        .notEmpty()
        .withMessage('El teléfono del cliente es obligatorio y debe ser una cadena.'),
    (0, express_validator_1.body)('cliente.canalComunicacion')
        .isIn(['INSTAGRAM', 'FACEBOOK', 'GOOGLE', 'WHATSAPP', 'PERSONAL'])
        .withMessage('El canal de comunicación debe ser uno de: Instagram, Facebook, Google, WhatsApp, Personal.'),
    (0, express_validator_1.body)('productos.*.nombre')
        .isString()
        .notEmpty()
        .withMessage('El nombre del producto es obligatorio y debe ser una cadena.'),
    (0, express_validator_1.body)('productos.*.cantidad')
        .isInt({ min: 1 })
        .withMessage('La cantidad del producto debe ser un número entero mayor que cero.'),
    (0, express_validator_1.body)('productos.*.precio')
        .isNumeric()
        .withMessage('El precio del producto debe ser un número mayor o igual a cero.'),
    (0, express_validator_1.body)('productos.*.subtotal')
        .isNumeric()
        .withMessage('El subtotal del producto debe ser un número mayor o igual a cero.'),
    (0, express_validator_1.body)('productos.*.diseñoUrl')
        .optional()
        .isString()
        .withMessage('La URL de diseño del producto debe ser una cadena.'),
    (0, express_validator_1.body)('imagenComprobante')
        .optional().isString()
        .withMessage('La imagen del comprobante debe ser una cadena.'),
    (0, express_validator_1.body)('observaciones')
        .optional().isString()
        .withMessage('Las observaciones deben ser una cadena.'),
    (0, express_validator_1.body)('guiaEnvio')
        .optional()
        .isString()
        .withMessage('La guía de envío debe ser una cadena.'),
    (0, express_validator_1.body)('puntoEntrega')
        .optional()
        .isString()
        .withMessage('El punto de entrega debe ser una cadena.'),
];
// Ruta para agregar una venta
router.post('/add', validateSale, saleController_1.addSale);
router.get('/', saleController_1.getAllSales);
router.get('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('El ID debe ser válido.'), saleController_1.getSaleById);
router.put('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('El ID debe ser válido.'), validateSale, saleController_1.updateSale);
router.delete('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('El ID debe ser válido.'), saleController_1.deleteSale);
exports.default = router;
//# sourceMappingURL=saleRoutes.js.map