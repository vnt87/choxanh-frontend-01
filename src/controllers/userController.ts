import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class UserController {
  async register(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, name, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, name, role });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Registration failed' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error();
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: 'Login failed' });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  }

  async updateProfile(req: Request, res: Response) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    try {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ error: 'User not found' });

      updates.forEach(update => user[update] = req.body[update]);
      await user.save();
      
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Update failed' });
    }
  }

  async deleteProfile(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndDelete(req.user._id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Delete failed' });
    }
  }
}
