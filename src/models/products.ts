import { Document, Schema, model } from 'mongoose';
import { Preferences } from '../enums/preferencesEnum.js';

export interface ProductsInterface extends Document {
  name: string;
  description: string;
  price: number;
  category: Preferences[];
  users: string[];
}

const productSchema = new Schema<ProductsInterface>({
  name: {
    type: String,
    required: false,
    trim: true,
  },  
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: false,
    trim: true,
  },
  category: {
    type: [String],
    enum: Object.values(Preferences),
    required: true,
  },
  users: {
    type: [String],
    required: true,
  },
});

export const Products = model<ProductsInterface>('Products', productSchema);