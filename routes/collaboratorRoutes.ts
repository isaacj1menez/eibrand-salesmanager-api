import express from 'express';
import { body } from 'express-validator';
import { addCollaborator, getAllCollaborators, getCollaboratorById, updateCollaborator, deleteCollaborator } from '../controllers/collaboratorController';

const router = express.Router();

// Validaciones
const validateCollaborator = [
    body('nombreCompleto')
        .isString()
        .notEmpty()
        .withMessage('El nombre completo es obligatorio.'),
    body('correo')
        .isEmail()
        .withMessage('El correo debe tener un formato válido.'),
    body('telefono')
        .isString()
        .notEmpty()
        .withMessage('El teléfono es obligatorio.'),
];

// Rutas
router.post('/add', validateCollaborator, addCollaborator);
router.get('/all', getAllCollaborators);
router.get('/:id', getCollaboratorById);
router.put('/update/:id', validateCollaborator, updateCollaborator);
router.delete('/delete/:id', deleteCollaborator);

export default router;
