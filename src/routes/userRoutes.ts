import express from 'express';
import { UserController } from '../controllers/userController';
import { auth } from '../middleware/auth';
import { userValidators } from '../middleware/validators';
import { authLimiter } from '../middleware/rateLimiter';

const router = express.Router();
const userController = new UserController();

// Public routes
router.post('/register', authLimiter, userValidators.register, userController.register);
router.post('/login', authLimiter, userValidators.login, userController.login);

// Protected routes
router.get('/profile/:id', auth, userController.getProfile);
router.put('/profile/:id', auth, userController.updateProfile);
router.delete('/profile/:id', auth, userController.deleteProfile);

export default router;
