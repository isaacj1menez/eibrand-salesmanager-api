import express from 'express';
import { body } from 'express-validator';
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/productController';
import Product from '../models/product';

const router = express.Router();

const validateAddProduct = [
    body('nombre')
        .isString()
        .notEmpty()
        .withMessage('El nombre es obligatorio.'),
    body('precio')
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser un número mayor que cero.'),
    body('categoriaBase')
        .isString()
        .notEmpty()
        .withMessage('La categoría base es obligatoria.'),
    body('categoria')
        .isString()
        .notEmpty()
        .withMessage('La categoría es obligatoria.'),
    body('codigo')
        .custom(async (value) => {
            if (value && value !== '') {
                const existingProduct = await Product.findOne({ codigo: value });
                if (existingProduct) {
                    throw new Error('El código del producto ya existe.');
                }
            }
        })
        .withMessage('El código del producto ya existe.'),
    body('descripcion')
        .optional()
        .isString()
        .withMessage('La descripción debe ser una cadena.'),
];

const validateUpdateProduct = [
    body('nombre')
        .optional()
        .isString()
        .notEmpty()
        .withMessage('El nombre es obligatorio.'),
    body('precio')
        .optional()
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser un número mayor que cero.'),
    body('categoriaBase')
        .optional()
        .isString()
        .notEmpty()
        .withMessage('La categoría base es obligatoria.'),
    body('categoria')
        .optional()
        .isString()
        .notEmpty()
        .withMessage('La categoría es obligatoria.'),
    body('codigo')
        .optional()
        .isString()
        .withMessage('El código debe ser una cadena.'),
    body('descripcion')
        .optional()
        .isString()
        .withMessage('La descripción debe ser una cadena.'),
];

router.post('/add', validateAddProduct, addProduct);
router.get('/all', getAllProducts);
router.get('/get', getProduct);
router.put('/update/:id', validateUpdateProduct, updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;
