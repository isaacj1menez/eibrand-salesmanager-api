import express from 'express';
import { addInventoryItem, getAllInventoryItems, getInventoryItemById, updateInventoryItem, deleteInventoryItem } from '../controllers/inventoryController';

const router = express.Router();

// Rutas para el controlador de Inventory
router.post('/add', addInventoryItem);
router.get('/', getAllInventoryItems);
router.get('/:id', getInventoryItemById);
router.put('/:id', updateInventoryItem);
router.delete('/:id', deleteInventoryItem);

export default router;
