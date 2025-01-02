
import { Schema, model } from 'mongoose';

interface IInventory {
  store: Schema.Types.ObjectId;
  product: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const inventorySchema = new Schema<IInventory>({
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
}, { timestamps: true });

export const Inventory = model<IInventory>('Inventory', inventorySchema);