
import { Router } from 'express';
import userRoutes from './userRoutes';
import storeRoutes from './storeRoutes';
import inventoryRoutes from './inventoryRoutes';
import charityRoutes from './charityRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/stores', storeRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/charity', charityRoutes);

export default router;