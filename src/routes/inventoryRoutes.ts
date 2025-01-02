
import express from 'express';
import { InventoryController } from '../controllers/inventoryController';

const router = express.Router();
const inventoryController = new InventoryController();

router.post('/items', inventoryController.createItem);
router.get('/items', inventoryController.getAllItems);
router.get('/items/:id', inventoryController.getItem);
router.put('/items/:id', inventoryController.updateItem);
router.delete('/items/:id', inventoryController.deleteItem);

export default router;