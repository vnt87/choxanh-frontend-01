
import { Schema, model } from 'mongoose';

interface IStore {
  name: string;
  owner: Schema.Types.ObjectId;
  description: string;
  location: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const storeSchema = new Schema<IStore>({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Store = model<IStore>('Store', storeSchema);