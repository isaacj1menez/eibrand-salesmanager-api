"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventoryController_1 = require("../controllers/inventoryController");
const router = express_1.default.Router();
// Rutas para el controlador de Inventory
router.post('/add', inventoryController_1.addInventoryItem);
router.get('/', inventoryController_1.getAllInventoryItems);
router.get('/:id', inventoryController_1.getInventoryItemById);
router.put('/:id', inventoryController_1.updateInventoryItem);
router.delete('/:id', inventoryController_1.deleteInventoryItem);
exports.default = router;
//# sourceMappingURL=inventoryRoutes.js.map