import { Request, Response } from 'express';
import { Charity } from '../models/Charity';

export class CharityController {
  async createCause(req: Request, res: Response) {
    try {
      const { title, description, goal } = req.body;
      const cause = new Charity({
        title,
        description,
        goal,
        organizer: req.user.userId
      });
      await cause.save();
      res.status(201).json(cause);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create cause' });
    }
  }

  async getAllCauses(req: Request, res: Response) {
    try {
      const causes = await Charity.find()
        .populate('organizer', 'name email')
        .sort({ createdAt: -1 });
      res.json(causes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch causes' });
    }
  }

  async getCause(req: Request, res: Response) {
    try {
      const cause = await Charity.findById(req.params.id)
        .populate('organizer', 'name email');
      if (!cause) return res.status(404).json({ error: 'Cause not found' });
      res.json(cause);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cause' });
    }
  }

  async updateCause(req: Request, res: Response) {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['title', 'description', 'goal'];
      const isValidOperation = updates.every(update => allowedUpdates.includes(update));

      if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates' });
      }

      const cause = await Charity.findOne({ _id: req.params.id, organizer: req.user._id });
      if (!cause) return res.status(404).json({ error: 'Cause not found' });

      updates.forEach(update => cause[update] = req.body[update]);
      await cause.save();
      
      res.json(cause);
    } catch (error) {
      res.status(400).json({ error: 'Update failed' });
    }
  }

  async deleteCause(req: Request, res: Response) {
    try {
      const cause = await Charity.findOneAndDelete({ 
        _id: req.params.id, 
        organizer: req.user._id 
      });
      if (!cause) return res.status(404).json({ error: 'Cause not found' });
      res.json({ message: 'Cause deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Delete failed' });
    }
  }

  async donate(req: Request, res: Response) {
    try {
      const { amount } = req.body;
      const cause = await Charity.findById(req.params.id);
      if (!cause) return res.status(404).json({ error: 'Cause not found' });
      
      cause.raisedAmount += amount;
      if (cause.raisedAmount >= cause.goal) {
        cause.status = 'completed';
      }
      
      await cause.save();
      res.status(200).json(cause);
    } catch (error) {
      res.status(400).json({ error: 'Failed to process donation' });
    }
  }
}