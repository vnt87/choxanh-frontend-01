import { Request, Response } from 'express';
import { Item } from '../models/Item';

export class InventoryController {
  async createItem(req: Request, res: Response) {
    try {
      const { name, description, price, quantity } = req.body;
      const item = new Item({
        name,
        description,
        price,
        quantity,
        seller: req.user.userId
      });
      await item.save();
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create item' });
    }
  }

  async getAllItems(req: Request, res: Response) {
    try {
      const items = await Item.find().populate('seller', 'name email');
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  }

  async getItem(req: Request, res: Response) {
    try {
      const item = await Item.findById(req.params.id).populate('seller', 'name email');
      if (!item) return res.status(404).json({ error: 'Item not found' });
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch item' });
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['name', 'description', 'price', 'quantity'];
      const isValidOperation = updates.every(update => allowedUpdates.includes(update));

      if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates' });
      }

      const item = await Item.findOne({ _id: req.params.id, seller: req.user._id });
      if (!item) return res.status(404).json({ error: 'Item not found' });

      updates.forEach(update => item[update] = req.body[update]);
      await item.save();
      
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: 'Update failed' });
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const item = await Item.findOneAndDelete({ _id: req.params.id, seller: req.user._id });
      if (!item) return res.status(404).json({ error: 'Item not found' });
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Delete failed' });
    }
  }
}