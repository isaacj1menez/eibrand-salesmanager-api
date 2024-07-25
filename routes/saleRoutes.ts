import express from 'express';
import { body, param } from 'express-validator';
import { addSale, deleteSale, getAllSales, getSaleById, updateSale } from '../controllers/saleController';

const router = express.Router();

// Middleware de validación para el cuerpo de la solicitud de venta
const validateSale = [
    body('fecha')
        .notEmpty()
        .withMessage('La fecha es obligatoria y debe tener un formato válido.'),
    body('total')
        .isNumeric()
        .withMessage('El total debe ser un número.'),
    body('restante')
        .isNumeric()
        .withMessage('El restante debe ser un número.'),
    body('metodoPago')
        .isString()
        .notEmpty()
        .withMessage('El método de pago es obligatorio y debe ser una cadena.'),
    body('status')
        .isIn(['PENDIENTE', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA', 'ENVIADA'])
        .withMessage('El estado debe ser uno de: pendiente, en_proceso, completada, cancelada.'),
    body('statusPago')
        .isIn(['PENDIENTE', 'PAGADO', 'ANTICIPO'])
        .withMessage('El estado de pago debe ser uno de: pendiente, pagado, vencido, reembolsado.'),
    body('cliente.nombre')
        .isString()
        .notEmpty()
        .withMessage('El nombre del cliente es obligatorio y debe ser una cadena.'),
    body('cliente.telefono')
        .isString()
        .notEmpty()
        .withMessage('El teléfono del cliente es obligatorio y debe ser una cadena.'),
    body('cliente.canalComunicacion')
        .isIn(['INSTAGRAM', 'FACEBOOK', 'GOOGLE', 'WHATSAPP', 'PERSONAL'])
        .withMessage('El canal de comunicación debe ser uno de: Instagram, Facebook, Google, WhatsApp, Personal.'),
    body('productos.*.nombre')
        .isString()
        .notEmpty()
        .withMessage('El nombre del producto es obligatorio y debe ser una cadena.'),
    body('productos.*.cantidad')
        .isInt({ min: 1 })
        .withMessage('La cantidad del producto debe ser un número entero mayor que cero.'),
    body('productos.*.precio')
        .isNumeric()
        .withMessage('El precio del producto debe ser un número mayor o igual a cero.'),
    body('productos.*.subtotal')
        .isNumeric()
        .withMessage('El subtotal del producto debe ser un número mayor o igual a cero.'),
    body('productos.*.diseñoUrl')
        .optional()
        .isString()
        .withMessage('La URL de diseño del producto debe ser una cadena.'),
    body('imagenComprobante')
        .optional().isString()
        .withMessage('La imagen del comprobante debe ser una cadena.'),
    body('observaciones')
        .optional().isString()
        .withMessage('Las observaciones deben ser una cadena.'),
    body('guiaEnvio')
        .optional()
        .isString()
        .withMessage('La guía de envío debe ser una cadena.'),
    body('puntoEntrega')
        .optional()
        .isString()
        .withMessage('El punto de entrega debe ser una cadena.'),
];

// Ruta para agregar una venta
router.post('/add', validateSale, addSale);
router.get('/', getAllSales);
router.get('/:id', param('id').isMongoId().withMessage('El ID debe ser válido.'), getSaleById);
router.put('/:id', param('id').isMongoId().withMessage('El ID debe ser válido.'), validateSale, updateSale);
router.delete('/:id', param('id').isMongoId().withMessage('El ID debe ser válido.'), deleteSale);

export default router;
