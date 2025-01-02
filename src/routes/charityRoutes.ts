
import express from 'express';
import { CharityController } from '../controllers/charityController';

const router = express.Router();
const charityController = new CharityController();

router.post('/causes', charityController.createCause);
router.get('/causes', charityController.getAllCauses);
router.get('/causes/:id', charityController.getCause);
router.put('/causes/:id', charityController.updateCause);
router.delete('/causes/:id', charityController.deleteCause);
router.post('/causes/:id/donate', charityController.donate);

export default router;