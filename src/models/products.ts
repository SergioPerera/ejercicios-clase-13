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
    validate : {
      validator : function(val: Preferences[]) {
        /// Check if the option is a valuen inside the enum
        if (!val.every((v) => Object.values(Preferences).includes(v))) {
          return false;
        }
        /// Check if the array is not empty
        return val.length > 0;
      },
      message: props => `Invalid preferences: ${JSON.stringify(props.value)}`
    },
    enum: Object.values(Preferences),
    required: true,
  },
  users: {
    type: [String],
    required: true,
  },
});

export const Products = model<ProductsInterface>('Products', productSchema);