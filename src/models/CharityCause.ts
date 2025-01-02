
import { Schema, model } from 'mongoose';

interface ICharityCause {
  name: string;
  description: string;
  target: number;
  raised: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const charityCauseSchema = new Schema<ICharityCause>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  target: { type: Number, required: true, min: 0 },
  raised: { type: Number, default: 0, min: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const CharityCause = model<ICharityCause>('CharityCause', charityCauseSchema);