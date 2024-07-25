"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const collaboratorController_1 = require("../controllers/collaboratorController");
const router = express_1.default.Router();
// Validaciones
const validateCollaborator = [
    (0, express_validator_1.body)('nombreCompleto')
        .isString()
        .notEmpty()
        .withMessage('El nombre completo es obligatorio.'),
    (0, express_validator_1.body)('correo')
        .isEmail()
        .withMessage('El correo debe tener un formato válido.'),
    (0, express_validator_1.body)('telefono')
        .isString()
        .notEmpty()
        .withMessage('El teléfono es obligatorio.'),
];
// Rutas
router.post('/add', validateCollaborator, collaboratorController_1.addCollaborator);
router.get('/all', collaboratorController_1.getAllCollaborators);
router.get('/:id', collaboratorController_1.getCollaboratorById);
router.put('/update/:id', validateCollaborator, collaboratorController_1.updateCollaborator);
router.delete('/delete/:id', collaboratorController_1.deleteCollaborator);
exports.default = router;
//# sourceMappingURL=collaboratorRoutes.js.map